import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateAlertDto } from './dto/create-alert.dto';

@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  checkHealth() {
    return { status: 'UP', service: 'alert-ingestion' };
  }
  @Post('alerts')
  create(@Body() createAlertDto: CreateAlertDto) {
    return this.appService.create(createAlertDto);
  }
}
