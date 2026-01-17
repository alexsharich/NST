import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Request} from "express";
import {DomainException} from "../exceptions/domain-exceptions";
import {DomainExceptionCode} from "../exceptions/domain-exceptions-codes";
import {JwtService} from "../../application/jwt.service";
import {DevicesQueryRepository} from "../../modules/user-accounts/devices/infrastucture/query/devices.query.repository";

@Injectable()
export class RefreshTokenGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
                private readonly devicesQueryRepository: DevicesQueryRepository) {

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest()
        const refreshToken = request.cookies['refreshToken']

        if (!refreshToken) {
            throw new DomainException({code: DomainExceptionCode.Unauthorized, message: 'Unauthorized'})
        }

        const token = this.jwtService.verifyRefreshToken(refreshToken)
        if (!token) {
            throw new DomainException({code: DomainExceptionCode.Unauthorized, message: 'Unauthorized'})
        }
        if (!token.userId || !token.deviceId) {
            throw new DomainException({code: DomainExceptionCode.Unauthorized, message: 'Unauthorized'})
        }

        const userId = token.userId
        const iat = token.iat
        const deviceId = token.deviceId
        const device = await this.devicesQueryRepository.getDeviceById(deviceId)

        if (!device) {
            throw new DomainException({code: DomainExceptionCode.Unauthorized, message: 'Unauthorized'})
        }
        if (device.userId !== userId) {
            throw new DomainException({code: DomainExceptionCode.Unauthorized, message: 'Unauthorized'})
        }
        if (device.iat !== new Date(iat * 1000).toISOString()) {
            throw new DomainException({code: DomainExceptionCode.Unauthorized, message: 'Unauthorized'})
        }

        request.userId = userId
        request.deviceId = deviceId

        return true
    }
}