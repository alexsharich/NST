import {Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards} from '@nestjs/common';
import {PasswordRecoveryType} from "./input-dto/password-recovery-dto";
import {NewPasswordType} from "./input-dto/new-password";
import {RegistrationConfirmationCode} from "./input-dto/registration-confirmation-code";
import {RegistrationEmailResending} from "./input-dto/registration-email-resending";
import {CreateUserInputDto} from "./input-dto/users.input-dto";
import {AuthService} from "../application/auth.service";
import {Login} from "./input-dto/login";
import {AuthGuard} from "../../../core/guards/auth.guard";
import {Request} from 'express'

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
        const token = await this.authService.login(body)
        return {accessToken: token}
    }

    @Post('password-recovery')
    async passwordRecovery(@Body() body: PasswordRecoveryType) {
        await this.authService.passwordRecovery(body.email)
    }

    @Post('new-password')
    async newPassword(@Body() body: NewPasswordType) {
        await this.authService.newPassword(body)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('registration-confirmation')
    async registrationConfirmation(@Body() code: RegistrationConfirmationCode) {
        await this.authService.registrationConfirmation(code)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('registration-email-resending')
    async registrationEmailResending(@Body() body: RegistrationEmailResending) {
        await this.authService.emailConfirmationCodeResending(body.email)
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('me')
    async me(@Req() req: Request) {
        const userId = req.userId!
        return this.authService.me(userId)
    }
}