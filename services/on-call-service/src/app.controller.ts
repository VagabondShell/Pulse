import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { OnCallCalculatorService } from './app.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('on-call')
@Controller('api/v1/on-call')
export class AppController {
  constructor(
    private readonly onCallCalculatorService: OnCallCalculatorService,
  ) {}

  @Get('current')
  @ApiOperation({ summary: 'Get the user currently on-call for a service' })
  @ApiQuery({ name: 'service', example: 'frontend-api' })
  async getCurrentOnCall(@Query('service') serviceName: string) {
    if (!serviceName) {
      throw new BadRequestException('You must provide a ?service= parameter');
    }
    return await this.onCallCalculatorService.getCurrentOnCallForService(
      serviceName,
    );
  }

  @Get('schedule')
  @ApiOperation({ summary: 'Get the full on-call schedule for a service' })
  @ApiQuery({ name: 'service', example: 'frontend-api' })
  async getFullSchedule(@Query('service') serviceName: string) {
    // Returns the entire array of slots for the next 4 weeks (For React Frontend)
    return this.onCallCalculatorService.getFullRotationForService(serviceName);
  }
}
