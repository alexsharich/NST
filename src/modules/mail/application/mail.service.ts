import {Injectable} from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';
import {ConfigService} from "@nestjs/config";
import {emailTemlptes} from "../templates/email-templates";

@Injectable()
export class Mailer {
    constructor(
        private readonly configService: ConfigService,
        private readonly mailerService: MailerService
    ) {
    }

    public async sendEmail(email: string, subject: string, text: string, code: string): Promise<void> {
        await this.mailerService
            .sendMail({
                to: email,
                from: ` "Alexander" ${this.configService.get('MAIL')}'`,
                subject: subject,
                text: text,
                html: subject === 'Registration' ? emailTemlptes.registrationEmail(code) : emailTemlptes.passwordRecoveryEmail(code),
            })
            .then(() => {
            })
            .catch(() => {
            });
    }
}