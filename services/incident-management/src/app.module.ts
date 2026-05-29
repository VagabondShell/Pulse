import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { IncidentsService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: [IncidentsService],
})
export class AppModule {}
