import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Alerts')
@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  checkHealth() {
    return { status: 'UP', service: 'alert-ingestion' };
  }

  @ApiOperation({ summary: 'Ingest a new alert' })
  @ApiResponse({ status: 201, description: 'Alert created' })
  @ApiResponse({ status: 400, description: 'Invalid schema' })
  @Post('alerts')
  create(@Body() createAlertDto: CreateAlertDto) {
    return this.appService.ingestAlert(createAlertDto);
  }
}
