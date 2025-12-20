import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MailerModule} from "@nestjs-modules/mailer";
import {Mailer} from "./application/mail.service";

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: configService.getOrThrow<string>('MAIL_HOST'),
                    port: configService.getOrThrow<number>('MAIL_PORT'),
                    secure: true,
                    tls: {
                        rejectUnauthorized: false,
                    },
                    auth: {
                        user: configService.getOrThrow<string>('MAIL_LOGIN'),
                        pass: configService.getOrThrow<string>('MAIL_PASS'),
                    },
                },
                defaults: {
                    from: configService.getOrThrow<string>('MAIL_LOGIN'),
                }
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