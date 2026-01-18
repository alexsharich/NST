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
import {UAParser} from "ua-parser-js";
import mongoose from "mongoose";
import {DomainException} from "../../../core/exceptions/domain-exceptions";
import {DomainExceptionCode} from "../../../core/exceptions/domain-exceptions-codes";
import {CommandBus} from "@nestjs/cqrs";
import {CreateDeviceCommand} from "../devices/application/use-cases/create-device/create-device.command";
import {
    DeleteDeviceByIdCommand
} from "../devices/application/use-cases/delete-device-by-id/delete-device-by-id.command";
import {UpdateDeviceCommand} from "../devices/application/use-cases/update-device/update-device.command";
import {RefreshTokenGuard} from "../../../core/guards/refresh.token.guard";
import {ThrottlerGuard} from "@nestjs/throttler";

@UseGuards(ThrottlerGuard)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly jwtService: JwtService,
                private readonly commandBus: CommandBus) {

    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('registration')
    async registration(@Body() body: CreateUserInputDto) {
        return this.authService.registration(body)
    }


    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() body: Login, @Res() res: Response, @Req() req: Request) {
        const deviceId = new mongoose.Types.ObjectId().toString()
        const {accessToken, refreshToken} = await this.authService.login({...body, deviceId})

        const ip = req.ip || '1'

        const {browser, device} = UAParser(req.headers['user-agent']);

        const deviceName = device.model || '' + browser.name || ''
        const decoded = this.jwtService.decodeToken(refreshToken)

        if (!decoded) {
            throw new DomainException({
                code: DomainExceptionCode.Unauthorized,
                message: 'Not auth'
            })


        }
        console.log('new DEVICE', device)

        const iat = new Date(decoded.iat! * 1000).toISOString()
        const userId = decoded.userId
        await this.commandBus.execute(new CreateDeviceCommand(ip, deviceName, deviceId, iat, userId))

        res.cookie('refreshToken', refreshToken, {
            maxAge: 21,
            httpOnly: true,
            secure: true
        })

        res.send({accessToken})
    }

    @UseGuards(RefreshTokenGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('logout')
    async logout(@Res() res: Response, @Req() req: Request) {
        const deviceId = req.deviceId!
        const userId = req.userId!
        await this.commandBus.execute(new DeleteDeviceByIdCommand(deviceId, userId))
        res.cookie('refreshToken', '', {
            httpOnly: true,
            secure: true,
            expires: new Date(0)
        })
        res.send()
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(RefreshTokenGuard)
    @Post('refresh-token')
    async refreshToken(@Req() req: Request, @Res() res: Response) {
        const userId = req.userId!
        const deviceId = req.deviceId!
        if (!userId) {
            res.sendStatus(401)
            return
        }


        const {accessToken, refreshToken} = this.jwtService.createToken(userId, String(deviceId))
        const decoded = this.jwtService.decodeToken(refreshToken)

        if (!decoded) {
            res.sendStatus(401)
            return
        }
        const iat = new Date(decoded.iat! * 1000).toISOString()
        await this.commandBus.execute(new UpdateDeviceCommand(decoded.deviceId, iat, userId))

        res.cookie('refreshToken', refreshToken, {
            maxAge: 21,
            httpOnly: true,
            secure: true
        })
        res.send({accessToken})
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