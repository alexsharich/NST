import {Injectable} from "@nestjs/common";
import {DeviceModelType, Device} from "../../dto/device.entity";
import {InjectModel} from "@nestjs/mongoose";
import {CreateDeviceViewDto} from "../../domain/create-device-view-dto/create-device-view-dto";
import {Types} from 'mongoose'

@Injectable()
export class DevicesQueryRepository {
    constructor(@InjectModel(Device.name) private readonly deviceModel: DeviceModelType) {
    }

    async getDevices(userId: string) {
        const devices = await this.deviceModel.find({userId, deletedAt: null})
        return devices.map(dev => CreateDeviceViewDto.mapToView(dev))
    }

    async getDeviceById(deviceId: string) {
        const id = new Types.ObjectId(deviceId)
        return this.deviceModel.find({_id: id, deletedAt: null})
    }

    async getAllDevices(userId: string): Promise<any> {//todo fix any
        return this.deviceModel.find({userId, deletedAt: null})
    }
}