import {Module} from '@nestjs/common';
import {UsersController} from './api/users.controller';
import {UsersService} from './application/users.service';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserSchema} from './domain/user.entity';
import {UsersQueryRepository} from './infrastructure/query/users.query-repository';
import {AuthController} from './api/auth.controller';
import {SecurityDevicesQueryRepository} from './infrastructure/query/security-devices.query-repository';
import {AuthQueryRepository} from './infrastructure/query/auth.query-repository';
import {UsersRepository} from "./infrastructure/users.repository";
import {JwtService} from "../../application/jwt.service";
import {AuthService} from "./application/auth.service";
import {MailModule} from "../mail/mail-module";
import {DevicesController} from "./devices/api/devices.cotroller";
import {CreateDeviceCommandHandler} from "./devices/application/use-cases/create-device/create-device.command.handler";
import {DeviceSchema, Device} from "./devices/dto/device.entity";
import {DevicesRepository} from "./devices/infrastucture/devices.repository";
import {DevicesQueryRepository} from "./devices/infrastucture/query/devices.query.repository";
import {UpdateDeviceCommandHandler} from "./devices/application/use-cases/update-device/update-device-command.handler";
import {
    DeleteDeviceByIdCommandHandler
} from "./devices/application/use-cases/delete-device-by-id/delete-device-by-id-command.handler";
import {
    DeleteDevicesCommandHandler
} from "./devices/application/use-cases/delete-devices/delete-devices.command.handler";

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}, {
            name: Device.name,
            schema: DeviceSchema
        }]),
        MailModule
    ],
    controllers: [UsersController, AuthController, DevicesController],
    providers: [
        JwtService,
        AuthService,
        UsersService,
        UsersRepository,
        UsersQueryRepository,
        UpdateDeviceCommandHandler,
        DeleteDeviceByIdCommandHandler,
        DeleteDevicesCommandHandler,
        SecurityDevicesQueryRepository,
        AuthQueryRepository,
        CreateDeviceCommandHandler,
        DevicesRepository,
        DevicesQueryRepository
    ],
})
export class UserAccountsModule {
}