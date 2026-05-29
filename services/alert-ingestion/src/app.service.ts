import { Injectable } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';

@Injectable()
export class AppService {
  create(dataLog: CreateAlertDto): CreateAlertDto {
    return dataLog;
  }
}
