import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsEnum,
  IsDateString,
} from 'class-validator';

export class ProcessAlertDto {
  @IsString()
  @IsNotEmpty()
  service: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['critical', 'warning', 'low', 'info'])
  severity: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsOptional()
  @IsObject()
  labels?: Record<string, any>;
  @IsOptional()
  @IsDateString()
  timestamp?: string;
}
