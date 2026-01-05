import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {InjectModel} from "@nestjs/mongoose";
import {DevicesRepository} from "../../../infrastucture/devices.repository";
import {Device, DeviceModelType} from "../../../dto/device.entity";
import {UpdateDeviceCommand} from "./update-device.command";
import {DomainException} from "../../../../../../core/exceptions/domain-exceptions";
import {DomainExceptionCode} from "../../../../../../core/exceptions/domain-exceptions-codes";

@CommandHandler(UpdateDeviceCommand)

export class UpdateDeviceCommandHandler implements ICommandHandler<UpdateDeviceCommand, void> {
    constructor(@InjectModel(Device.name) private readonly deviceModel: DeviceModelType,
                private readonly devicesRepository: DevicesRepository) {

    }

    async execute({deviceId, iat}: UpdateDeviceCommand) {
        //TODO добавить репу
        const device = await this.deviceModel.findById(deviceId)
        if (!device) {
            throw new DomainException({
                code: DomainExceptionCode.NotFound,
                message: 'Device not found'
            })
        }
        device.update(iat)
        await this.devicesRepository.save(device)
    }
}