import {Module} from '@nestjs/common';
import {MailerModule} from '@nestjs-modules/mailer';
import {AppController} from "../../app.controller";
import {AppService} from "../../app.service";
import {ConfigModule, ConfigService} from "@nestjs/config";

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
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}