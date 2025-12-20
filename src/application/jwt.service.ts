import jwt, {JwtPayload} from 'jsonwebtoken'
import {ConfigService} from "@nestjs/config";
import {Injectable} from "@nestjs/common";


interface MyJwtPayload extends JwtPayload {
    userId: string
    deviceId: string
}

@Injectable()
export class JwtService {
    private JWT_ACCESS: string
    private JWT_REFRESH: string

    constructor(private readonly configService: ConfigService) {
        this.JWT_ACCESS = configService.getOrThrow<string>('JWT_ACCESS')
        this.JWT_REFRESH = configService.getOrThrow<string>('JWT_REFRESH')
    }

    createToken(userId: string, deviceId?: string) {
        const accessToken = jwt.sign({userId}, this.JWT_ACCESS, {expiresIn: '300s'})
        const refreshToken = jwt.sign({
            userId,
            deviceId
        }, this.JWT_REFRESH, {expiresIn: '600s'})
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
            return <MyJwtPayload>jwt.verify(token, this.JWT_REFRESH)
        } catch (error) {
            return null
        }
    }

    verifyToken(token: string) {
        try {
            return <MyJwtPayload>jwt.verify(token, this.JWT_ACCESS)
        } catch (error) {
            return null
        }
    }
}