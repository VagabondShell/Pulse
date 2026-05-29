import { Body, Controller, Get, Post } from '@nestjs/common';
import { IncidentsService } from './app.service';
import { ProcessAlertDto } from './dto/process-alert.dto';

@Controller('incidents')
export class AppController {
  constructor(private readonly appService: IncidentsService) {}
  @Post()
  create(@Body() processAlertDto: ProcessAlertDto) {
    return this.appService.processAlert(processAlertDto);
  }
}
