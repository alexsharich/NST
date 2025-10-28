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


@Module({
    imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/'),
        UserAccountsModule,
        BloggersPlatformModule,
        ClearDBModule,
        ConfigModule.forRoot({isGlobal: true}),
        MailerModule.forRoot({
            transport: 'smtps://user@domain.com:pass@smtp.domain.com',//TODO add userName password
            defaults: {
                from: '"Alexander" <skotch3k2@yandex.ru>',
            },
            template: {
                dir: __dirname + '/templates',
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
