import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserAccountsModule} from "./modules/user-accounts/user-accounts.module";
import {BloggersPlatformModule} from "./modules/blogeers-platform/bloggers-platform.module";
import {ClearDBModule} from "./modules/blogeers-platform/clearDB/clear-database.module";
import {ConfigModule} from '@nestjs/config';
import {MailModule} from "./modules/mail/mail-module";
import {APP_FILTER} from "@nestjs/core";
import {DomainHttpExceptionsFilter} from "./core/exceptions/filters/domain-exeptions-filter";
import { CqrsModule } from '@nestjs/cqrs';



@Module({
    imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/'),
        UserAccountsModule,
        BloggersPlatformModule,
        ClearDBModule,
        ConfigModule.forRoot({isGlobal: true}),
        MailModule,
        CqrsModule.forRoot()],
    controllers: [AppController],
    providers: [AppService,
        {
            provide: APP_FILTER,
            useClass: DomainHttpExceptionsFilter,
        }],
})
export class AppModule {
}
