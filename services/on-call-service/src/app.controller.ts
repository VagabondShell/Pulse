import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { OnCallCalculatorService } from './app.service';

@Controller('api/v1/on-call')
export class AppController {
  constructor(
    private readonly onCallCalculatorService: OnCallCalculatorService,
  ) {}

  @Get('current') // The specific endpoint
  async getCurrentOnCall(@Query('service') serviceName: string) {
    if (!serviceName) {
      throw new BadRequestException('You must provide a ?service= parameter');
    }
    return await this.onCallCalculatorService.getCurrentOnCallForService(
      serviceName,
    );
  }
}
