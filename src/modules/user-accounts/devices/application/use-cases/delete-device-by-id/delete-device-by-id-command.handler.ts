import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteDeviceByIdCommand} from "./delete-device-by-id.command";
import {InjectModel} from "@nestjs/mongoose";
import {DeviceModelType, Device} from "../../../dto/device.entity";
import {DomainException} from "../../../../../../core/exceptions/domain-exceptions";
import {DomainExceptionCode} from "../../../../../../core/exceptions/domain-exceptions-codes";
import {DevicesRepository} from "../../../infrastucture/devices.repository";
import {DevicesQueryRepository} from "../../../infrastucture/query/devices.query.repository";

@CommandHandler(DeleteDeviceByIdCommand)
export class DeleteDeviceByIdCommandHandler implements ICommandHandler<DeleteDeviceByIdCommand, void> {
    constructor(@InjectModel(Device.name) public readonly deviceModel: DeviceModelType,
                private readonly devicesRepository: DevicesRepository,
                private readonly devicesQueryRepository: DevicesQueryRepository) {

    }

    async execute({deviceId, userId}: DeleteDeviceByIdCommand) {
        const device = await this.devicesQueryRepository.getDeviceById(userId, deviceId)
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