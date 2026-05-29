import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OnCallCalculatorService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { HealthController } from './health/health.controller';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
  controllers: [AppController, HealthController],
  providers: [OnCallCalculatorService, PrismaService],
})
export class AppModule {}
