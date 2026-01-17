export class UpdateDeviceCommand {
    constructor(public deviceId: string, public iat: string, public userId: string) {
    }
}