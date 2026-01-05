import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteDeviceByIdCommand} from "./delete-device-by-id.command";
import {InjectModel} from "@nestjs/mongoose";
import {DeviceModelType, Device} from "../../../dto/device.entity";
import {DomainException} from "../../../../../../core/exceptions/domain-exceptions";
import {DomainExceptionCode} from "../../../../../../core/exceptions/domain-exceptions-codes";
import {DevicesRepository} from "../../../infrastucture/devices.repository";

@CommandHandler(DeleteDeviceByIdCommand)
export class DeleteDeviceByIdCommandHandler implements ICommandHandler<DeleteDeviceByIdCommand, void> {
    constructor(@InjectModel(Device.name) public readonly deviceModel: DeviceModelType,
                private readonly devicesRepository: DevicesRepository) {

    }

    async execute({deviceId, userId}: DeleteDeviceByIdCommand) {
        //await this.deviceModel.deleteOne({_id: deviceId, deletedAt: null})
        // TODO добавить репу
        const device = await this.deviceModel.findOne({
            _id: deviceId,
            userId,
            deletedAt: null
        })
        if (!device) {
            throw new DomainException({
                code: DomainExceptionCode.NotFound,
                message: 'Device not found'
            })
        }
        device.makeDeleted()
        await this.devicesRepository.save(device);
    }
}