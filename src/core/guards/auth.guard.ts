import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Request} from "express";
import {DomainException} from "../exceptions/domain-exceptions";
import {DomainExceptionCode} from "../exceptions/domain-exceptions-codes";
import {JwtService} from "../../application/jwt.service";
import {UsersRepository} from "../../modules/user-accounts/infrastructure/users.repository";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
                private readonly usersRepository: UsersRepository) {

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest()
        const auth = request.headers['authorization']
        if (!auth) {
            throw new DomainException({
                code: DomainExceptionCode.Unauthorized,
                message: 'Unauthorized auth'
            })
        }
        const token = auth.split(' ')[1]
        const payload = this.jwtService.verifyToken(token)
        if (!payload) {
            throw new DomainException({
                code: DomainExceptionCode.Unauthorized,
                message: 'Unauthorized pay'
            })
        }
        request.userId = payload!.userId
        const isUserExist = await this.usersRepository.findOne(request!.userId)
        if (!isUserExist) {
            throw new DomainException({
                code: DomainExceptionCode.Unauthorized,
                message: 'Unauthorized is user exist'
            })
        }
        request.user = isUserExist
        return true
    }
}