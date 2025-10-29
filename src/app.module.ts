import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserAccountsModule} from "./modules/user-accounts/user-accounts.module";
import {BloggersPlatformModule} from "./modules/blogeers-platform/bloggers-platform.module";
import {ClearDBModule} from "./modules/blogeers-platform/clearDB/clear-database.module";
import {ConfigModule} from '@nestjs/config';
import {MailerModule} from "@nestjs-modules/mailer";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import {MailModule} from "./modules/mail/mail-module";


@Module({
    imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/'),
        UserAccountsModule,
        BloggersPlatformModule,
        ClearDBModule,
        ConfigModule.forRoot({isGlobal: true}),
        MailModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
