import {Injectable} from "@nestjs/common";
import {DeviceModelType, Device} from "../../dto/device.entity";
import {InjectModel} from "@nestjs/mongoose";
import {CreateDeviceViewDto} from "../../domain/create-device-view-dto/create-device-view-dto";

@Injectable()
export class DevicesQueryRepository {
    constructor(@InjectModel(Device.name) private readonly deviceModel: DeviceModelType) {
    }

    async getDevices(userId: string) {
        const devices = await this.deviceModel.find({userId})
        return devices.map(dev => CreateDeviceViewDto.mapToView(dev))
    }
}