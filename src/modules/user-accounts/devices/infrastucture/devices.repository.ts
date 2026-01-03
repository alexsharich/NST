import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {DeviceModelType, Device, DeviceDocument} from "../dto/device.entity";

@Injectable()
export class DevicesRepository {

    constructor(@InjectModel(Device.name) private readonly deviceModel: DeviceModelType) {

    }

    async save(device: DeviceDocument) {
        await device.save()
        return device._id.toString()
    }
}