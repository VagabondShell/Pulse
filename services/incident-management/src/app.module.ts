import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { IncidentsService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [AppController],
  providers: [IncidentsService],
})
export class AppModule {}
