import { Test, TestingModule } from '@nestjs/testing';
import { IncidentsService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

describe('IncidentsService', () => {
  let service: IncidentsService;

  const mockPrismaService = {
    rawAlert: {
      create: jest.fn(),
      update: jest.fn(),
    },
    incident: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  const mockHttpService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IncidentsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<IncidentsService>(IncidentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('processAlert', () => {
    const alertDto = {
      service: 'payment-gateway',
      severity: 'critical',
      message: 'Connection timeout',
      labels: { env: 'prod' },
    };

    const mockRawAlert = { id: 'alert-1', ...alertDto };

    beforeEach(() => {
      jest.clearAllMocks();
      mockPrismaService.rawAlert.create.mockResolvedValue(mockRawAlert);
    });

    it('should create a new incident if no open incident exists', async () => {
      mockPrismaService.incident.findFirst.mockResolvedValue(null);
      mockPrismaService.incident.create.mockResolvedValue({
        id: 'inc-1',
        ...alertDto,
        priority: 'high',
      });

      const onCallResponse: AxiosResponse = {
        data: {
          primary: { id: 'eng-1', name: 'John Doe', email: 'john@example.com' },
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };
      mockHttpService.get.mockReturnValue(of(onCallResponse));
      mockPrismaService.incident.update.mockResolvedValue({
        id: 'inc-1',
        assigneeName: 'John Doe',
      });

      await service.processAlert(alertDto);

      expect(mockPrismaService.rawAlert.create).toHaveBeenCalled();
      expect(mockPrismaService.incident.findFirst).toHaveBeenCalled();
      expect(mockPrismaService.incident.create).toHaveBeenCalled();
      expect(mockHttpService.get).toHaveBeenCalled();
      expect(mockPrismaService.incident.update).toHaveBeenCalled();
    });

    it('should link to existing incident if one is open', async () => {
      const existingIncident = {
        id: 'inc-existing',
        service: 'payment-gateway',
        status: 'open',
      };
      mockPrismaService.incident.findFirst.mockResolvedValue(existingIncident);
      mockPrismaService.rawAlert.update.mockResolvedValue({
        ...mockRawAlert,
        incidentId: 'inc-existing',
      });

      await service.processAlert(alertDto);

      expect(mockPrismaService.incident.create).not.toHaveBeenCalled();
      expect(mockPrismaService.rawAlert.update).toHaveBeenCalledWith({
        where: { id: 'alert-1' },
        data: { incidentId: 'inc-existing' },
      });
    });
  });

  describe('getIncidents', () => {
    it('should return mapped incidents', async () => {
      const mockIncidents = [
        {
          id: '1',
          service: 'test',
          priority: 'high',
          status: 'open',
          createdAt: new Date(),
          assigneeName: 'Test User',
        },
      ];
      mockPrismaService.incident.findMany.mockResolvedValue(mockIncidents);

      const result = await service.getIncidents();

      expect(result[0].severity).toBe('HIGH');
      expect(result[0].status).toBe('OPEN');
    });
  });
});
