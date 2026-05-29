import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsDateString,
} from 'class-validator';
export class CreateAlertDto {
  @IsString()
  @IsNotEmpty({ message: 'The service name is strictly required' })
  service: string;

  @IsString()
  @IsNotEmpty({ message: 'The severity name is strictly required' })
  severity: string;

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
