import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
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
  @Get(':id')
  //        <Route path="/incident/:id" element={<IncidentDetails />} />
  async getIncident(@Param('id', ParseUUIDPipe) id: string) {
    return this.incidentsService.getIncident(id);
  }
  @Patch(':id/acknowledge')
  async acknowledge(@Param('id', ParseUUIDPipe) id: string) {
    return this.incidentsService.acknowledgeIncident(id);
  }

  @Patch(':id/resolve')
  async resolve(@Param('id', ParseUUIDPipe) id: string) {
    return this.incidentsService.resolveIncident(id);
  }
}
