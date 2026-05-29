import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { OnCallCalculatorService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  const mockOnCallCalculatorService = {
    getCurrentOnCallForService: jest.fn(),
    getFullRotationForService: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: OnCallCalculatorService,
          useValue: mockOnCallCalculatorService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
