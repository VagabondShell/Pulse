import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IncidentsService } from './app.service';
import { ProcessAlertDto } from './dto/process-alert.dto';

@Controller('incidents')
export class AppController {
  constructor(private readonly incidentsService: IncidentsService) {}
  @Post()
  create(@Body() processAlertDto: ProcessAlertDto) {
    return this.incidentsService.processAlert(processAlertDto);
  }
  @Get()
  async getAllIncidents(@Query('status') status?: string) {
    return this.incidentsService.getIncidents(status);
  }
}
