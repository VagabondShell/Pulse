import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { InternalServerErrorException } from '@nestjs/common';
import { AxiosResponse, InternalAxiosErrorConfig } from 'axios';

describe('AppService', () => {
  let service: AppService;
  let httpService: HttpService;

  const mockHttpService = {
    post: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('ingestAlert', () => {
    const createAlertDto = {
      service: 'test-service',
      severity: 'critical',
      message: 'Test alert message',
      labels: { env: 'production' },
    };

    it('should successfully ingest an alert', async () => {
      const resultData = { id: 'incident-123' };
      const response: AxiosResponse = {
        data: resultData,
        status: 201,
        statusText: 'Created',
        headers: {},
        config: {} as InternalAxiosErrorConfig,
      };

      mockHttpService.post.mockReturnValue(of(response));

      const result = await service.ingestAlert(createAlertDto);

      expect(result).toEqual(resultData);
      expect(httpService.post).toHaveBeenCalledWith(
        'http://incident-management:8002/incidents',
        createAlertDto,
      );
    });

    it('should throw InternalServerErrorException when http call fails', async () => {
      mockHttpService.post.mockReturnValue(throwError(() => new Error('Network Error')));

      await expect(service.ingestAlert(createAlertDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
