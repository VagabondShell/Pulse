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
