import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ProcessAlertDto } from './dto/process-alert.dto';

@Injectable()
export class IncidentsService {
  constructor(private prisma: PrismaService) {}
  private readonly severityToPriority: Record<string, string> = {
    critical: 'high',
    warning: 'medium',
    low: 'low',
    info: 'low',
  };
  async processAlert(dataLog: ProcessAlertDto) {
    const twoHoursAgo = new Date();
    twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);
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
        // Searching for the service name in the title
        title: { contains: dataLog.service, mode: 'insensitive' },
        priority: targetPriority, // Using our mapped priority
        createdAt: { gte: twoHoursAgo },
      },
    });

    if (existingIncident) {
      // 4a. If found: Link the alert to the existing incident
      return await this.prisma.rawAlert.update({
        where: { id: alert.id },
        data: { incidentId: existingIncident.id },
      });
    } else {
      // 4b. If NOT found: Create a new incident and link the alert
      return await this.prisma.incident.create({
        data: {
          title: `Issue in ${dataLog.service} (${dataLog.severity})`,
          priority: targetPriority, // Using the same mapped priority
          status: 'open',
          assigneeName: 'Unassigned',
          alerts: {
            connect: { id: alert.id },
          },
        },
      });
    }
  }
}
