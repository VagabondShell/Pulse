import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsEnum,
  IsDateString,
} from 'class-validator';

export class ProcessAlertDto {
  @ApiProperty({ example: 'frontend-api' })
  @IsString()
  @IsNotEmpty()
  service: string;

  @ApiProperty({
    example: 'critical',
    enum: ['critical', 'warning', 'low', 'info'],
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(['critical', 'warning', 'low', 'info'])
  severity: string;

  @ApiProperty({ example: 'HTTP 5xx error rate > 10%' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    required: false,
    example: { instance: 'pod-123', region: 'us-east-1' },
  })
  @IsOptional()
  @IsObject()
  labels?: Record<string, any>;

  @ApiProperty({ required: false, example: '2026-06-07T12:00:00Z' })
  @IsOptional()
  @IsDateString()
  timestamp?: string;
}
