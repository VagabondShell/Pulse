// src/app.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs'; // Helper to convert Observable to Promise
import { CreateAlertDto } from './dto/create-alert.dto';

@Injectable()
export class AppService {
  // 1. Inject the service
  constructor(private readonly httpService: HttpService) {}

  async ingestAlert(dataLog: CreateAlertDto) {
    const url = 'http://localhost:8002/incidents'; // The address of your new service

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, dataLog),
      );
      return response.data;
    } catch (error) {
      console.error('Failed to contact Incident Service:', error.message);
      throw new InternalServerErrorException(
        'Incident Management Service is unreachable',
      );
    }
  }
}
