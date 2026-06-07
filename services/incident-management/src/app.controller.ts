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
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('incidents')
@Controller('incidents')
export class AppController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Post()
  @ApiOperation({ summary: 'Process a new alert and correlate to an incident' })
  @ApiResponse({ status: 201, description: 'Alert processed' })
  create(@Body() processAlertDto: ProcessAlertDto) {
    return this.incidentsService.processAlert(processAlertDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all incidents' })
  @ApiQuery({ name: 'status', required: false, example: 'open' })
  async getAllIncidents(@Query('status') status?: string) {
    return this.incidentsService.getIncidents(status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get incident details by ID' })
  @ApiParam({ name: 'id', format: 'uuid' })
  async getIncident(@Param('id', ParseUUIDPipe) id: string) {
    return this.incidentsService.getIncident(id);
  }

  @Patch(':id/acknowledge')
  @ApiOperation({ summary: 'Acknowledge an incident' })
  @ApiParam({ name: 'id', format: 'uuid' })
  async acknowledge(@Param('id', ParseUUIDPipe) id: string) {
    return this.incidentsService.acknowledgeIncident(id);
  }

  @Patch(':id/resolve')
  @ApiOperation({ summary: 'Resolve an incident' })
  @ApiParam({ name: 'id', format: 'uuid' })
  async resolve(@Param('id', ParseUUIDPipe) id: string) {
    return this.incidentsService.resolveIncident(id);
  }
}
