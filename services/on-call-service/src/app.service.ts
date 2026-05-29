import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class OnCallCalculatorService {
  constructor(private prisma: PrismaService) {}

  async getCurrentOnCallForService(serviceName: string) {
    // Find service and team
    const service = await this.prisma.service.findUnique({
      where: { name: serviceName },
      include: { team: true },
    });

    if (!service) {
      throw new Error(`Service '${serviceName}' not found`);
    }

    return this.getCurrentOnCallForTeam(service.teamId);
  }

  async getCurrentOnCallForTeam(teamId: string) {
    // Load schedule with all slots
    const schedule = await this.prisma.schedule.findFirst({
      where: {
        teamId: teamId,
        isActive: true,
      },
      include: {
        slots: {
          include: {
            engineer: true,
          },
        },
        team: true,
      },
    });

    if (!schedule) {
      throw new Error(`No active schedule found for team ${teamId}`);
    }

    if (schedule.slots.length === 0) {
      throw new Error('Schedule has no rotation slots defined');
    }

    // 👇 Calculate current week using the loaded slots
    const currentWeek = this.calculateCurrentWeek(
      schedule.startDate,
      schedule.slots,
    );

    // Find on-call engineers for this week
    const primarySlot = schedule.slots.find(
      (slot) => slot.weekNumber === currentWeek && slot.role === 'primary',
    );

    const secondarySlot = schedule.slots.find(
      (slot) => slot.weekNumber === currentWeek && slot.role === 'secondary',
    );

    if (!primarySlot) {
      throw new Error(
        `No primary on-call found for week ${currentWeek}. ` +
          `Available weeks: ${this.getAvailableWeeks(schedule.slots).join(', ')}`,
      );
    }

    return {
      teamId: schedule.teamId,
      teamName: schedule.team.name,
      scheduleId: schedule.id,
      currentWeek: currentWeek,
      totalWeeksInRotation: this.getTotalWeeksInRotation(schedule.slots),
      primary: {
        id: primarySlot.engineer.id,
        name: primarySlot.engineer.name,
        email: primarySlot.engineer.email,
        phone: primarySlot.engineer.phone,
      },
      secondary: secondarySlot
        ? {
            id: secondarySlot.engineer.id,
            name: secondarySlot.engineer.name,
            email: secondarySlot.engineer.email,
            phone: secondarySlot.engineer.phone,
          }
        : null,
      escalationDelayMinutes: schedule.escalationDelayMinutes,
    };
  }

  // 👇 FIXED: Calculate dynamically based on actual slots
  private calculateCurrentWeek(startDate: Date, slots: any[]): number {
    // Get unique week numbers from slots (only primary for rotation length)
    const uniqueWeeks = this.getUniqueWeekNumbers(slots, 'primary');

    if (uniqueWeeks.length === 0) {
      throw new Error('No primary rotation slots found');
    }

    const now = new Date();
    const msPerWeek = 7 * 24 * 60 * 60 * 1000;

    // How many weeks have passed since rotation started?
    const msPassed = now.getTime() - startDate.getTime();
    const weeksPassed = Math.floor(msPassed / msPerWeek);

    // Total weeks in this specific rotation
    const totalWeeksInRotation = uniqueWeeks.length;

    // Calculate which week we're in (1-indexed)
    // weeksPassed % totalWeeksInRotation gives 0 to (total-1)
    // Add 1 to make it 1 to total
    const weekIndex = weeksPassed % totalWeeksInRotation;

    // Return the actual week number from the rotation
    return uniqueWeeks[weekIndex];
  }

  // Helper: Get unique week numbers for a specific role
  private getUniqueWeekNumbers(slots: any[], role?: string): number[] {
    const filteredSlots = role
      ? slots.filter((slot) => slot.role === role)
      : slots;

    const weekNumbers = filteredSlots.map((slot) => slot.weekNumber);
    const uniqueWeeks = [...new Set(weekNumbers)].sort((a, b) => a - b);

    return uniqueWeeks;
  }

  // Helper: Get total rotation length
  private getTotalWeeksInRotation(slots: any[]): number {
    return this.getUniqueWeekNumbers(slots, 'primary').length;
  }

  // Helper: Get all available weeks (for error messages)
  private getAvailableWeeks(slots: any[]): number[] {
    return this.getUniqueWeekNumbers(slots, 'primary');
  }
}
