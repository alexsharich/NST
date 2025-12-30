import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Request} from "express";
import {JwtService} from "../../application/jwt.service";

@Injectable()
export class UserIdGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest<Request>()
        const token = request.headers.authorization?.split(" ")[1];
        const decodedToken = token ? this.jwtService.decodeToken(token) : null
        request.userId = decodedToken ? decodedToken.userId : null;
        return true
    }
}