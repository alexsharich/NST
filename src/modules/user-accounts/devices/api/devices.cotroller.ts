import {Controller, Delete, Get, HttpCode, HttpStatus, Param, Req, UseGuards} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {DeviceModelType, Device} from "../dto/device.entity";
import {CreateDeviceViewDto} from "../domain/create-device-view-dto/create-device-view-dto";
import {Request} from 'express'
import {DevicesQueryRepository} from "../infrastucture/query/devices.query.repository";
import {CommandBus} from "@nestjs/cqrs";
import {DeleteDeviceByIdCommand} from "../application/use-cases/delete-device-by-id/delete-device-by-id.command";
import {DeleteDevicesCommand} from "../application/use-cases/delete-devices/delete-devices.command";
import {RefreshTokenGuard} from "../../../../core/guards/refresh.token.guard";

@Controller('security/devices')
export class DevicesController {
    constructor(@InjectModel(Device.name) private readonly deviceModel: DeviceModelType,
                private readonly devicesQueryRepository: DevicesQueryRepository,
                private readonly commandBus: CommandBus) {
    }

    @UseGuards(RefreshTokenGuard)
    @Get()
    async getAllDevices(@Req() req: Request): Promise<CreateDeviceViewDto[]> {
        const userId = req.userId!
        return await this.devicesQueryRepository.getDevices(userId)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(RefreshTokenGuard)
    @Delete()
    async deleteAllDevices(@Req() req: Request) {
        const userId = req.userId!
        const deviceId = req.deviceId!
        return this.commandBus.execute(new DeleteDevicesCommand(userId, deviceId))
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(RefreshTokenGuard)
    @Delete(':deviceId')
    async deleteDevice(@Param('deviceId') deviceId: string, @Req() req: Request) {
        const userId = req.userId!
        return this.commandBus.execute(new DeleteDeviceByIdCommand(deviceId, userId))
    }

}