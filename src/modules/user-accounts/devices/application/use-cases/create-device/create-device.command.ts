export class CreateDeviceCommand {
    constructor(public ip: string,
                public title: string,
                public deviceId: string,
                public iat: string,
                public userId: string) {
    }
}