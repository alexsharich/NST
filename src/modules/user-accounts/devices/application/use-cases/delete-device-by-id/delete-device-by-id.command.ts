export class DeleteDeviceByIdCommand {
    constructor(public readonly deviceId: string, public readonly userId: string) {

    }
}