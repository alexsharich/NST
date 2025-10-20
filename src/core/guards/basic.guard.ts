import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {Request} from "express";
import {DomainException} from "../exceptions/domain-exceptions";
import {DomainExceptionCode} from "../exceptions/domain-exceptions-codes";

@Injectable()
export class BasicGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest()
        const [type, base64Credentials] = request.headers['authorization']?.split(' ') || []
        if (type !== 'Basic') {
            throw new DomainException({code: DomainExceptionCode.Unauthorized, message: 'Unauthorized'})
        }
        const credentials = Buffer.from(base64Credentials, 'base64').toString(
            'utf-8',
        );
        const [login, password] = credentials.split(':')
        if (login !== 'admin' && password !== 'qwerty') {
            throw new DomainException({code: DomainExceptionCode.Unauthorized, message: 'Unauthorized'})
        }
        return true
    }
}