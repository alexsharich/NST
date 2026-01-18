export class DeleteDevicesCommand {
    constructor(public readonly userId: string, public readonly deviceId: string) {

    }
}