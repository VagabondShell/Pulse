import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('current') // The specific endpoint
  async getCurrentOnCall(
    // 👇 THIS IS THE MAGIC LINE 👇
    @Query('service') serviceName: string,
  ) {
    // 1. Validate: Did they actually send the parameter?
    if (!serviceName) {
      throw new BadRequestException('You must provide a ?service= parameter');
    }

    // 2. Pass it to your Modulo Math logic!
    return await this.appService.getOnCallEngineer(serviceName);
  }
}
