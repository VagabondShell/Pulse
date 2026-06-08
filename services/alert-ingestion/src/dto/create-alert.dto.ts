import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsDateString,
} from 'class-validator';
export class CreateAlertDto {
  @ApiProperty({ example: 'frontend-api' })
  @IsString()
  @IsNotEmpty({ message: 'The service name is strictly required' })
  service: string;

  @ApiProperty({ example: 'high', enum: ['critical', 'high', 'medium', 'low'] })
  @IsString()
  @IsNotEmpty({ message: 'The severity name is strictly required' })
  severity: string;

  @ApiProperty({ example: 'HTTP 5xx error rate > 10%' })
  @IsString({ message: 'The message name is strictly required' })
  @IsNotEmpty()
  message: string;

  @IsOptional()
  @IsObject()
  labels?: Record<string, any>;

  @IsOptional()
  @IsDateString()
  timestamp?: string;
}
