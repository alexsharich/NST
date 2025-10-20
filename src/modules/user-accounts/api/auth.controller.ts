import {Body, Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {PasswordRecoveryType} from "./input-dto/password-recovery-dto";
import {NewPasswordType} from "./input-dto/new-password";
import {RegistrationConfirmationCode} from "./input-dto/registration-confirmation-code";
import {RegistrationEmailResending} from "./input-dto/registration-email-resending";
import {CreateUserInputDto} from "./input-dto/users.input-dto";
import {AuthService} from "../application/auth.service";
import {Login} from "./input-dto/login";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('registration')
    async registration(@Body() body: CreateUserInputDto) {
        return this.authService.registration(body)
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() body: Login) {
        

    }

    @Post('password-recovery')
    passwordRecovery(@Body() body: PasswordRecoveryType) {

    }

    @Post('new-password')
    newPassword(@Body() body: NewPasswordType) {
    }

    @Post('registration-confirmation')
    registrationConfirmation(@Body() code: RegistrationConfirmationCode) {
    }

    @Post('registration-email-resending')
    registrationEmailResending(@Body() body: RegistrationEmailResending) {

    }

    @HttpCode(HttpStatus.OK)
    @Get('me')
    me() {

    }
}