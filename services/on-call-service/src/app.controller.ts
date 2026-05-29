import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { OnCallCalculatorService } from './app.service';

@Controller('api/v1/on-call')
export class AppController {
  constructor(
    private readonly onCallCalculatorService: OnCallCalculatorService,
  ) {}

  @Get('current')
  async getCurrentOnCall(@Query('service') serviceName: string) {
    if (!serviceName) {
      throw new BadRequestException('You must provide a ?service= parameter');
    }
    return await this.onCallCalculatorService.getCurrentOnCallForService(
      serviceName,
    );
  }

  @Get('schedule')
  async getFullSchedule(@Query('service') serviceName: string) {
    // Returns the entire array of slots for the next 4 weeks (For React Frontend)
    return this.onCallCalculatorService.getFullRotationForService(serviceName);
  }
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});
}
