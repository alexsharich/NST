import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateDeviceCommand} from "./create-device.command";
import {InjectModel} from "@nestjs/mongoose";
import {DevicesRepository} from "../../../infrastucture/devices.repository";
import {DeviceModelType, Device} from "../../../dto/device.entity";
import {Types} from "mongoose";

@CommandHandler(CreateDeviceCommand)

export class CreateDeviceCommandHandler implements ICommandHandler<CreateDeviceCommand, void> {
    constructor(@InjectModel(Device.name) private readonly deviceModel: DeviceModelType,
                private readonly devicesRepository: DevicesRepository) {

    }

    async execute({ip, title, deviceId, iat, userId}: CreateDeviceCommand) {

        const device = this.deviceModel.createInstance({deviceId, iat, title, ip, userId})
        device._id = new Types.ObjectId(deviceId)
        await this.devicesRepository.save(device)
    }
}