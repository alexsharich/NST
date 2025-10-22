import jwt, {JwtPayload} from 'jsonwebtoken'
import {ConfigService} from "@nestjs/config";


interface MyJwtPayload extends JwtPayload {
    userId: string
    deviceId: string
}

export class JwtService {
    constructor(private readonly configService: ConfigService) {
    }

    createToken(userId: string, deviceId?: string) {
        const accessToken = jwt.sign({userId}, this.configService.getOrThrow<string>('JWT_ACCESS'), {expiresIn: '300s'})
        const refreshToken = jwt.sign({
            userId,
            deviceId
        }, this.configService.getOrThrow<string>('JWT_REFRESH'), {expiresIn: '600s'})
        return {accessToken, refreshToken}
    }

    decodeToken(token: string) {
        try {
            return <MyJwtPayload>jwt.decode(token)
        } catch (error) {
            console.log('Cant decode token', error)
            return null
        }
    }

    verifyRefreshToken(token: string) {
        try {
            return <MyJwtPayload>jwt.verify(token, process.env.JWT_REFRESH)
        } catch (error) {
            return null
        }
    }

    verifyToken(token: string) {
        try {
            return <MyJwtPayload>jwt.verify(token, process.env.JWT_ACCESS)
        } catch (error) {
            console.log('ERROR', error)
            return null
        }
    }
}