import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { IncidentsService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './health/health.controller';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
@Module({
  imports: [
    PrismaModule,
    HttpModule,
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
  controllers: [AppController, HealthController],
  providers: [IncidentsService],
})
export class AppModule {}
