import {Controller, Delete, Get, HttpCode, HttpStatus, Param, Req, UseGuards} from '@nestjs/common';

import {AuthGuard} from "../../../../core/guards/auth.guard";
import {InjectModel} from "@nestjs/mongoose";
import {DeviceModelType, Device, DeviceDocument} from "../dto/device.entity";
import {CreateDeviceViewDto} from "../domain/create-device-view-dto/create-device-view-dto";
import {Request} from 'express'
import {DevicesQueryRepository} from "../infrastucture/query/devices.query.repository";

@Controller('security/devices')
export class DevicesController {
    constructor(@InjectModel(Device.name) private readonly deviceModel: DeviceModelType,
                private readonly devicesQueryRepository: DevicesQueryRepository) {
    }

    @UseGuards(AuthGuard)
    @Get()
    async getAllDevices(@Req() req: Request): Promise<CreateDeviceViewDto[]> {
        const userId = req.userId!
        return await this.devicesQueryRepository.getDevices(userId)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard)
    @Delete()
    async deleteAllDevices() {
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard)
    @Delete(':deviceId')
    async deleteDevice(@Param('deviceId') diviceId: string) {
    }

}