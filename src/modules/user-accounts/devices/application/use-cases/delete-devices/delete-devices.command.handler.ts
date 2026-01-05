import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {InjectModel} from "@nestjs/mongoose";
import {DeviceModelType, Device, DeviceDocument} from "../../../dto/device.entity";
import {DevicesRepository} from "../../../infrastucture/devices.repository";
import {DeleteDevicesCommand} from "./delete-devices.command";
import {DomainException} from "../../../../../../core/exceptions/domain-exceptions";
import {DomainExceptionCode} from "../../../../../../core/exceptions/domain-exceptions-codes";

@CommandHandler(DeleteDevicesCommand)
export class DeleteDevicesCommandHandler implements ICommandHandler<DeleteDevicesCommand, void> {
    constructor(@InjectModel(Device.name) public readonly deviceModel: DeviceModelType,
                private readonly devicesRepository: DevicesRepository) {
    }

    async execute(userId: DeleteDevicesCommand) {
        //await this.deviceModel.deleteMany({userId})
        // TODO добавить репу
        const devices = await this.deviceModel.find({userId, deletedAt: null})

        if (!devices) {
            throw new DomainException({
                code: DomainExceptionCode.NotFound,
                message: 'Devices not found'
            })

            for (const device of devices) {
                device.makeDeleted();
                void await this.devicesRepository.save(device);
            }
        }
    }

}