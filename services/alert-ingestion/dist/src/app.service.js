"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
let AppService = class AppService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dataLog) {
        const twoHoursAgo = new Date();
        twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);
        const alert = await this.prisma.rawAlert.create({ data: dataLog });
        const existingIncident = await this.prisma.incident.findFirst({
            where: {
                status: 'open',
                title: { contains: dataLog.service, mode: 'insensitive' },
                priority: dataLog.severity === 'critical'
                    ? 'high'
                    : dataLog.severity === 'low'
                        ? 'low'
                        : 'medium',
                createdAt: { gte: twoHoursAgo },
            },
        });
        if (existingIncident) {
            return await this.prisma.rawAlert.update({
                where: { id: alert.id },
                data: { incidentId: existingIncident.id },
            });
        }
        else {
            return await this.prisma.incident.create({
                data: {
                    title: `Issue in ${dataLog.service} (${dataLog.severity})`,
                    priority: dataLog.severity === 'critical' ? 'high' : 'medium',
                    status: 'open',
                    alerts: { connect: { id: alert.id } },
                },
            });
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppService);
//# sourceMappingURL=app.service.js.map