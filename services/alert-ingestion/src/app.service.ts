import { Injectable } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { PrismaService } from './prisma/prisma.service'; // Adjust path if needed

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async create(dataLog: CreateAlertDto) {
    // We use await because database operations are asynchronous
    const newAlert = await this.prisma.rawAlert.create({
      data: {
        service: dataLog.service,
        severity: dataLog.severity,
        message: dataLog.message,
        labels: dataLog.labels || {}, // Handles optional JSON fields
      },
    });

    return newAlert;
  }
}
