import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ProcessAlertDto } from './dto/process-alert.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs'; // Helper to convert Observable to Promise

@Injectable()
export class IncidentsService {
  private readonly logger = new Logger(IncidentsService.name);
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  private readonly severityToPriority: Record<string, string> = {
    critical: 'high',
    warning: 'medium',
    low: 'low',
    info: 'low',
  };

  async processAlert(dataLog: ProcessAlertDto) {
    const fiveMinutesAgo = new Date();
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
    // 1. Determine the internal priority once
    const targetPriority =
      this.severityToPriority[dataLog.severity] || 'medium';
    // 2. Save the Raw Alert metadata first
    const alert = await this.prisma.rawAlert.create({
      data: {
        service: dataLog.service,
        severity: dataLog.severity,
        message: dataLog.message,
        labels: dataLog.labels || {},
      },
    });

    // 3. Search for a matching OPEN incident
    const existingIncident = await this.prisma.incident.findFirst({
      where: {
        status: 'open',
        service: dataLog.service,
        priority: targetPriority, // Using our mapped priority
        createdAt: { gte: fiveMinutesAgo },
      },
    });

    if (existingIncident) {
      // 4a. If found: Link the alert to the existing incident
      return await this.prisma.rawAlert.update({
        where: { id: alert.id },
        data: { incidentId: existingIncident.id },
      });
    } else {
      let incident = await this.prisma.incident.create({
        data: {
          title: `Issue in ${dataLog.service} (${dataLog.severity})`,
          service: dataLog.service,
          priority: targetPriority, // Using the same mapped priority
          status: 'open',
          alerts: {
            connect: { id: alert.id },
          },
        },
      });
      try {
        this.logger.log(
          `📞 Calling On-Call Service for team: ${dataLog.service}...`,
        );
        const response = await firstValueFrom(
          this.httpService.get(
            `http://localhost:8003/api/v1/on-call/current?service=${dataLog.service}`,
          ),
        );
        const onCallEngineer = response.data;
        console.log('RECEIVED FROM 8003:', onCallEngineer);
        incident = await this.prisma.incident.update({
          where: { id: incident.id },
          data: {
            assigneeId: onCallEngineer.primary?.id,
            assigneeName: onCallEngineer.primary?.name,
            assigneeEmail: onCallEngineer.primary?.email,
          },
        });
        this.logger.log(
          `✅ Successfully assigned Incident to: ${onCallEngineer.name}`,
        );
        return incident;
      } catch (error) {
        this.logger.error(
          `❌ Failed to assign engineer to incident: ${error.message}`,
        );
        return incident;
      }
    }
  }
  async getIncidents(statusFilter?: string) {
    const incidents = await this.prisma.incident.findMany({
      where: {
        ...(statusFilter && { status: statusFilter }),
      },
      orderBy: {
        createdAt: 'desc', // Newest alerts at the top!
      },
    });

    return incidents.map((incident) => ({
      id: incident.id,
      service: incident.service,
      severity: incident.priority.toUpperCase(),
      status: incident.status.toUpperCase(),
      createdAt: incident.createdAt.toISOString(),
      assigneeName: incident.assigneeName || 'Unassigned',
    }));
  }
}
