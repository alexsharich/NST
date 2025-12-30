import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Request} from "express";
import {DomainException} from "../exceptions/domain-exceptions";
import {DomainExceptionCode} from "../exceptions/domain-exceptions-codes";
import {JwtService} from "../../application/jwt.service";
import {UsersRepository} from "../../modules/user-accounts/infrastructure/users.repository";

@Injectable()
export class UserIdGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
                private readonly usersRepository: UsersRepository) {

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest()
        const auth = request.headers['authorization']
        if (!auth) {
            throw new DomainException({code: DomainExceptionCode.Unauthorized, message: 'Unauthorized'})
        }
        const token = auth.split(' ')[1]
        const payload = this.jwtService.decodeToken(token)
        if (!payload) {
            throw new DomainException({code: DomainExceptionCode.Unauthorized, message: 'Unauthorized'})
        }
        request.userId = payload!.userId
        return true
    }
}