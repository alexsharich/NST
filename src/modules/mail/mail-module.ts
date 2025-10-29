import {Module} from '@nestjs/common';
import {AppController} from "../../app.controller";
import {AppService} from "../../app.service";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MailerModule} from "@nestjs-modules/mailer";
import {Mailer} from "./application/mail.service";

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: 'smtp.yandex.ru',
                    port: 465,
                    ignoreTLS: true,
                    secure: true,
                    auth: {
                        user: configService.getOrThrow('MAIL'),
                        pass: 'EMAIL_PAS',
                    },
                },
                defaults: {
                    from: `"Alexander" ${configService.getOrThrow('MAIL')}`,
                },
            }),
            inject: [ConfigService],
            imports: [ConfigModule]
        }),
    ],
    providers: [Mailer],
    exports: [Mailer]
})
export class MailModule {
}