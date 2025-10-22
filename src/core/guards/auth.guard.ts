import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {Request} from "express";
import {DomainException} from "../exceptions/domain-exceptions";
import {DomainExceptionCode} from "../exceptions/domain-exceptions-codes";
import {JwtService} from "../../application/jwt.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest()
        const auth = request.headers['authorization']
        if (!auth) {
            throw new DomainException({code: DomainExceptionCode.Unauthorized, message: 'Unauthorized'})
        }
        const token = auth.split(' ')[1]
        const payload = this.jwtService.verifyToken(token)
        if (!payload) {
            throw new DomainException({code: DomainExceptionCode.Unauthorized, message: 'Unauthorized'})
        }
        request.userId = payload!.userId
        return true
    }
}