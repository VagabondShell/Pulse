import { AppService } from './app.service';
import { CreateAlertDto } from './dto/create-alert.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    checkHealth(): {
        status: string;
        service: string;
    };
    create(createAlertDto: CreateAlertDto): Promise<{
        service: string;
        message: string;
        severity: string;
        labels: import("@prisma/client/runtime/client").JsonValue | null;
        id: string;
        status: string;
        eventTime: Date;
        receivedAt: Date;
        incidentId: string | null;
    } | {
        id: string;
        status: string;
        title: string;
        description: string | null;
        priority: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
