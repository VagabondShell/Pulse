import { CreateAlertDto } from './dto/create-alert.dto';
import { PrismaService } from './prisma/prisma.service';
export declare class AppService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dataLog: CreateAlertDto): Promise<{
        service: string;
        message: string;
        severity: string;
        labels: import("@prisma/client/runtime/client").JsonValue | null;
        id: string;
        status: string;
        incidentId: string | null;
        eventTime: Date;
        receivedAt: Date;
    }>;
}
