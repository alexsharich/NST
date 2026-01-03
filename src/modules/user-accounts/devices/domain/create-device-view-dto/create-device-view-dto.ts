import {DeviceDocument} from "../../dto/device.entity";

export class CreateDeviceViewDto {
    ip: string
    title: string
    lastActiveDate: string
    deviceId: string

    static mapToView(dev: DeviceDocument) {
        return {
            ip: dev.ip,
            title: dev.title,
            lastActiveDate: dev.updatedAt.toISOString(),
            deviceId: dev._id.toString()
        }
    }
}


