import {Injectable} from "@nestjs/common";
import {CreateUserInputDto} from "../api/input-dto/users.input-dto";
import {UsersRepository} from "../infrastructure/users.repository";
import {DomainException} from "../../../core/exceptions/domain-exceptions";
import {DomainExceptionCode} from "../../../core/exceptions/domain-exceptions-codes";
import {UserModelType} from "../domain/user.entity";
import bcrypt from "bcrypt";
import {JwtService} from "../../../application/jwt.service";
import {Login} from "../api/input-dto/login";
import {UsersQueryRepository} from "../infrastructure/query/users.query-repository";
import {NewPasswordType} from "../api/input-dto/new-password";
import {UserMeViewDto} from "../api/view-dto/users-me.view-dto";

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository,
                private readonly usersQueryRepository: UsersQueryRepository,
                private readonly userModel: UserModelType,
                private readonly jwtService: JwtService) {

    }

    async registration({login, password, email}: CreateUserInputDto) {
        const user = await this.usersRepository.findUserByLoginOrEmail({login, email})
        if (user) {
            throw new DomainException({
                code: DomainExceptionCode.BadRequest,
                message: 'Login or email is exist'
            })
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt)
        const newUser = this.userModel.createInstance({login, passwordHash, email})
        await this.usersRepository.save(newUser)
    }

    async login({loginOrEmail, password}: Login): Promise<string> {
        const user = await this.usersRepository.findUserByLoginOrEmail({login: loginOrEmail, email: loginOrEmail})
        if (!user) {
            throw new DomainException({
                code: DomainExceptionCode.Unauthorized,
                message: 'Password or login or email is wrong'
            })
        }
        const {accessToken} = await this.jwtService.createToken(user.id)
        return accessToken
    }

    async me(request: Request): Promise<UserMeViewDto> {
        const userId = request['userId']
        if (!userId) {
            throw new DomainException({code: DomainExceptionCode.Unauthorized, message: 'Unauthorized'})
        }
        const user = await this.usersQueryRepository.getByIdOrNotFoundFail(userId) //with createdAt
        return UserMeViewDto.mapToView(user)//TODO перемапил ???
    }

    async newPassword({newPassword, recoveryCode}: NewPasswordType) {
        const user = await this.usersRepository.findUserByRecoveryCode(recoveryCode)
        if (!user) {
            throw new DomainException({code: DomainExceptionCode.NotFound, message: 'User not found'})
        }
        const salt = await bcrypt.genSalt(7)//TODO magic number .env
        const passwordHash = await bcrypt.hash(newPassword, salt)
        //const currentUser  = await this.userModel.changePassword(passwordHash)
        //await this.usersRepository.save(currentUser)
    }

}