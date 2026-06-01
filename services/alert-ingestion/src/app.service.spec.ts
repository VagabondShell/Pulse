import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { InternalServerErrorException } from '@nestjs/common';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

describe('AppService', () => {
  let service: AppService;

  // We keep our mock strongly typed
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
  });

  // DevOps Best Practice: Clean up mocks after every single test
  afterEach(() => {
    jest.clearAllMocks();
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

      // Fixed Unsafe Assignment: Using InternalAxiosRequestConfig
      const response: AxiosResponse = {
        data: resultData,
        status: 201,
        statusText: 'Created',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      mockHttpService.post.mockReturnValue(of(response));

      const result = await service.ingestAlert(createAlertDto);

      expect(result).toEqual(resultData);

      // Fixed Unbound Method: We check the mock function directly!
      expect(mockHttpService.post).toHaveBeenCalledWith(
        'http://incident-management:8002/incidents',
        createAlertDto,
      );
    });

    it('should throw InternalServerErrorException when http call fails', async () => {
      const networkError = new Error('Network Error');
      mockHttpService.post.mockReturnValue(throwError(() => networkError));

      // Fixed Unbound Method: Safely wrap the call in an arrow function
      await expect(async () => {
        await service.ingestAlert(createAlertDto);
      }).rejects.toThrow(InternalServerErrorException);
    });
  });
});
