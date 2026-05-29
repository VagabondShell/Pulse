import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { IncidentsService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  const mockIncidentsService = {
    processAlert: jest.fn(),
    getIncidents: jest.fn(),
    getIncident: jest.fn(),
    acknowledgeIncident: jest.fn(),
    resolveIncident: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: IncidentsService,
          useValue: mockIncidentsService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
