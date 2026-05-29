import { CreateAlertDto } from './dto/create-alert.dto';
import { PrismaService } from './prisma/prisma.service';
export declare class AppService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dataLog: CreateAlertDto): Promise<{
        id: string;
        service: string;
        severity: string;
        message: string;
        labels: import("@prisma/client/runtime/client").JsonValue | null;
        status: string;
        eventTime: Date;
        receivedAt: Date;
        incidentId: string | null;
    }>;
}
