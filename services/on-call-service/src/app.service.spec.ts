import { Test, TestingModule } from '@nestjs/testing';
import { OnCallCalculatorService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

describe('OnCallCalculatorService', () => {
  let service: OnCallCalculatorService;

  const mockPrismaService = {
    service: {
      findUnique: jest.fn(),
    },
    schedule: {
      findFirst: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OnCallCalculatorService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<OnCallCalculatorService>(OnCallCalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCurrentOnCallForService', () => {
    it('should throw error if service is not found', async () => {
      mockPrismaService.service.findUnique.mockResolvedValue(null);
      await expect(
        service.getCurrentOnCallForService('unknown'),
      ).rejects.toThrow("Service 'unknown' not found");
    });

    it('should return on-call info for a valid service', async () => {
      const mockService = { id: 's1', name: 'payment', teamId: 't1' };
      const mockSchedule = {
        id: 'sch1',
        teamId: 't1',
        isActive: true,
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        escalationDelayMinutes: 15,
        team: { name: 'Payments Team' },
        slots: [
          {
            weekNumber: 1,
            role: 'primary',
            engineer: {
              id: 'e1',
              name: 'Eng 1',
              email: 'e1@ex.com',
              phone: '123',
            },
          },
          {
            weekNumber: 2,
            role: 'primary',
            engineer: {
              id: 'e2',
              name: 'Eng 2',
              email: 'e2@ex.com',
              phone: '456',
            },
          },
        ],
      };

      mockPrismaService.service.findUnique.mockResolvedValue(mockService);
      mockPrismaService.schedule.findFirst.mockResolvedValue(mockSchedule);

      const result = await service.getCurrentOnCallForService('payment');

      expect(result.teamName).toBe('Payments Team');
      // Since it's 1 week ago, it should be week 2 (if index 1)
      // Actually calculateCurrentWeek:
      // msPassed / msPerWeek = 1
      // weeksPassed % 2 = 1
      // uniqueWeeks = [1, 2]
      // uniqueWeeks[1] = 2
      expect(result.currentWeek).toBe(2);
      expect(result.primary.name).toBe('Eng 2');
    });
  });
});
