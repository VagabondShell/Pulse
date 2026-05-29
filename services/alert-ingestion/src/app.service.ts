// src/app.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs'; // Helper to convert Observable to Promise
import { CreateAlertDto } from './dto/create-alert.dto';
import { AxiosResponse } from 'axios';

@Injectable()
export class AppService {
  // 1. Inject the service
  constructor(private readonly httpService: HttpService) {}

  async ingestAlert(dataLog: CreateAlertDto): Promise<Record<string, any>> {
    const url = 'http://incident-management:8002/incidents'; // The address of your new service

    try {
      const response: AxiosResponse<Record<string, any>> = await firstValueFrom(
        this.httpService.post<Record<string, any>>(url, dataLog),
      );
      return response.data;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      console.error('Failed to contact Incident Service:', errorMessage);
      throw new InternalServerErrorException(
        'Incident Management Service is unreachable',
      );
    }
  }
}
