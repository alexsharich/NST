import {Module} from '@nestjs/common';
import {UsersController} from './api/users.controller';
import {UsersService} from './application/users.service';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserSchema} from './domain/user.entity';
import {UsersQueryRepository} from './infrastructure/query/users.query-repository';
import {AuthController} from './api/auth.controller';
import {SecurityDevicesQueryRepository} from './infrastructure/query/security-devices.query-repository';
import {AuthQueryRepository} from './infrastructure/query/auth.query-repository';
import {SecurityDevicesController} from './api/security-devices.controller';
import {UsersRepository} from "./infrastructure/users.repository";
import {JwtService} from "../../application/jwt.service";
import {AuthService} from "./application/auth.service";
import {MailModule} from "../mail/mail-module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]), MailModule
    ],
    controllers: [UsersController, AuthController, SecurityDevicesController],
    providers: [
        JwtService,
        AuthService,
        UsersService,
        UsersRepository,
        UsersQueryRepository,
        SecurityDevicesQueryRepository,
        AuthQueryRepository,
    ],
})
export class UserAccountsModule {
}