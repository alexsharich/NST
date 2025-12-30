import {Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards} from '@nestjs/common';
import {PasswordRecoveryType} from "./input-dto/password-recovery-dto";
import {NewPasswordType} from "./input-dto/new-password";
import {RegistrationConfirmationCode} from "./input-dto/registration-confirmation-code";
import {RegistrationEmailResending} from "./input-dto/registration-email-resending";
import {CreateUserInputDto} from "./input-dto/users.input-dto";
import {AuthService} from "../application/auth.service";
import {Login} from "./input-dto/login";
import {AuthGuard} from "../../../core/guards/auth.guard";
import {Request, Response} from 'express'
import {daysToMs} from "../../../helpers/days-to-ms";
import {JwtService} from "../../../application/jwt.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly jwtService: JwtService) {

    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('registration')
    async registration(@Body() body: CreateUserInputDto) {
        return this.authService.registration(body)
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() body: Login, @Res() res: Response) {
        const {accessToken, refreshToken} = await this.authService.login(body)
        res.cookie('refreshToken', refreshToken, {
            maxAge: (daysToMs(3)),
            httpOnly: true,
            secure: true
        })
        return {accessToken: accessToken}
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('logout')
    async logout(@Res() res: Response) {
        res.clearCookie('refreshToken')
        return
    }

    @Post('refresh-token')
    async refreshToken(@Req() req: Request, @Res() res: Response) {
        const userId = req.userId
        const deviceId = req.deviceId
        if (!userId) {
            res.sendStatus(401)
            return
        }


        const {accessToken, refreshToken} = this.jwtService.createToken(userId, String(deviceId))
        const tokenDecoded = this.jwtService.decodeToken(refreshToken)

        if (!tokenDecoded) {
            res.sendStatus(401)
            return
        }

        res.cookie('refreshToken', refreshToken, {
            maxAge: (daysToMs(3)),
            httpOnly: true,
            secure: true
        })
        res.status(200).json({accessToken})
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