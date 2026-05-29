export declare class CreateAlertDto {
    service: string;
    severity: string;
    message: string;
    labels?: Record<string, any>;
    timestamp?: string;
}
