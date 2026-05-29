import { Body, Controller, Get, Post } from '@nestjs/common';
import { IncidentsService } from './app.service';
import { ProcessAlertDto } from './dto/process-alert.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: IncidentsService) {}
  @Post('alerts')
  create(@Body('incidents') processAlertDto: ProcessAlertDto) {
    return this.appService.processAlert(processAlertDto);
  }
}
