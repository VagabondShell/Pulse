import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OnCallCalculatorService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [OnCallCalculatorService, PrismaService],
})
export class AppModule {}
