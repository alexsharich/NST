import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {InjectModel} from "@nestjs/mongoose";
import {DeviceModelType, Device} from "../../../dto/device.entity";
import {DevicesRepository} from "../../../infrastucture/devices.repository";
import {DeleteDevicesCommand} from "./delete-devices.command";
import {DomainException} from "../../../../../../core/exceptions/domain-exceptions";
import {DomainExceptionCode} from "../../../../../../core/exceptions/domain-exceptions-codes";
import {DevicesQueryRepository} from "../../../infrastucture/query/devices.query.repository";

@CommandHandler(DeleteDevicesCommand)
export class DeleteDevicesCommandHandler implements ICommandHandler<DeleteDevicesCommand, void> {
    constructor(@InjectModel(Device.name) public readonly deviceModel: DeviceModelType,
                private readonly devicesRepository: DevicesRepository,
                private readonly devicesQueryRepository: DevicesQueryRepository) {
    }

    async execute(userId: DeleteDevicesCommand) {
        const devices = await this.devicesQueryRepository.getAllDevices(userId.userId)
        if (!devices) {
            throw new DomainException({
                code: DomainExceptionCode.NotFound,
                message: 'Devices not found'
            })
        }
        for (const device of devices) {
            device.makeDeleted();
            await this.devicesRepository.save(device);
        }
    }

}