import { HttpService } from '@nestjs/axios';
import { CreateAlertDto } from './dto/create-alert.dto';
export declare class AppService {
    private readonly httpService;
    constructor(httpService: HttpService);
    ingestAlert(dataLog: CreateAlertDto): Promise<any>;
}
