import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

export interface OnCallResponse {
  assigneeId: string;
  name: string;
  email: string;
}
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private prisma: PrismaService) {}
  async getOnCallEngineer(serviceName: string): Promise<OnCallResponse> {
    //here the logic to get the current engenner to solve this issue
    const team = await this.prisma.team.findUnique({
      where: { name: serviceName },
      include: {
        engineers: {
          orderBy: { email: 'asc' },
        },
      },
    });
    if (!team || team.engineers.length === 0) {
      this.logger.error(
        `No team or engineers found for service: ${serviceName}`,
      );
      throw new NotFoundException(
        `No on-call rotation found for ${serviceName}`,
      );
    }
    const engineers = team.engineers;
    const millisecondsInWeek = 1000 * 60 * 60 * 24 * 7;
    const currentWeekNumber = Math.floor(Date.now() / millisecondsInWeek);
    const onCallIndex = currentWeekNumber % engineers.length;
    const onCallEngineer = engineers[onCallIndex];

    this.logger.log(
      `📞 Calculated On-Call for ${serviceName}: ${onCallEngineer.name}`,
    );

    // 3. TypeScript will throw an error if this return object doesn't match the interface perfectly
    return {
      assigneeId: onCallEngineer.id,
      name: onCallEngineer.name,
      email: onCallEngineer.email,
    };
  }
}
