import {Injectable} from "@nestjs/common";
import {CreateUserInputDto} from "../api/input-dto/users.input-dto";
import {UsersRepository} from "../infrastructure/users.repository";
import {DomainException} from "../../../core/exceptions/domain-exceptions";
import {DomainExceptionCode} from "../../../core/exceptions/domain-exceptions-codes";
import {User, UserModelType} from "../domain/user.entity";
import bcrypt from "bcrypt";
import {JwtService} from "../../../application/jwt.service";
import {Login} from "../api/input-dto/login";
import {UsersQueryRepository} from "../infrastructure/query/users.query-repository";
import {NewPasswordType} from "../api/input-dto/new-password";
import {UserViewDto} from "../api/view-dto/users.view-dto";
import {RegistrationConfirmationCode} from "../api/input-dto/registration-confirmation-code";
import {Mailer} from "../../mail/application/mail.service";
import {add} from "date-fns";
import {randomUUID} from 'crypto'
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository,
                private readonly usersQueryRepository: UsersQueryRepository,
                @InjectModel(User.name) private readonly userModel: UserModelType,
                private readonly jwtService: JwtService,
                private readonly mailer: Mailer
    ) {

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
        const now = new Date()
        const confirmationCode = randomUUID()
        const expirationDate = add(now, {hours: 1,})
        const newUser = this.userModel.createInstance({login, passwordHash, email}, confirmationCode, expirationDate)
        await this.usersRepository.save(newUser)
        await this.mailer.sendEmail(email, 'Registration', 'Please, confirm registration', confirmationCode)
    }

    async registrationConfirmation(code: RegistrationConfirmationCode) {
        const user = await this.usersRepository.findUserByConfirmationCode(code)
        if (!user) {
            throw new DomainException({
                code: DomainExceptionCode.BadRequest,
                message: 'Confirmation code is incorrect, expired or already been applied'
            })
        }
        if (!user.emailConfirmation?.expirationDate) {
            throw new DomainException({
                code: DomainExceptionCode.BadRequest,
                message: 'BAD REQUEST'
            })
        }
        if (user.emailConfirmation.expirationDate > new Date()) {
            throw new DomainException({
                code: DomainExceptionCode.BadRequest,
                message: '',
                extensions: [
                    {
                        message: 'Confirmation code exp',
                        field: 'code'
                    }
                ]
            })
        }

        user.setIsConfirmed()
        await this.usersRepository.save(user)
    }

    async login({loginOrEmail, password}: Login): Promise<string> {
        const user = await this.usersRepository.findUserByLoginOrEmail({login: loginOrEmail, email: loginOrEmail})
        if (!user) {
            throw new DomainException({
                code: DomainExceptionCode.Unauthorized,
                message: 'Password or login or email is wrong'
            })
        }
        const isCompare = await bcrypt.compare(password, user.passwordHash)
        if (!isCompare) {
            throw new DomainException({
                code: DomainExceptionCode.Unauthorized,
                message: 'Password or login or email is wrong'
            })
        }
        const {accessToken} = await this.jwtService.createToken(user.id)
        return accessToken
    }

    async me(userId: string): Promise<Omit<UserViewDto, 'createdAt'>> {
        const {createdAt, ...rest} = await this.usersQueryRepository.getByIdOrNotFoundFail(userId)
        return rest
    }

    async newPassword({newPassword, recoveryCode}: NewPasswordType) {
        const user = await this.usersRepository.findUserByRecoveryCode(recoveryCode)
        if (!user) {
            throw new DomainException({code: DomainExceptionCode.NotFound, message: 'User not found'})
        }
        const salt = await bcrypt.genSalt(7)
        const passwordHash = await bcrypt.hash(newPassword, salt)
        if (!user.passwordRecovery?.expirationDate) {
            throw new DomainException({
                code: DomainExceptionCode.BadRequest,
                message: 'BAD REQUEST'
            })
        }
        if (user.passwordRecovery.expirationDate > new Date) {
            throw new DomainException({
                code: DomainExceptionCode.BadRequest,
                message: '',
                extensions: [
                    {
                        message: 'Confirmation code exp',
                        field: 'code'
                    }
                ]
            })
        }
        user.changePassword(passwordHash)
        await this.usersRepository.save(user)
    }

    async emailConfirmationCodeResending(email: string) {
        const user = await this.usersRepository.findUserByLoginOrEmail({login: email, email})

        if (!user) {
            throw new DomainException({
                code: DomainExceptionCode.BadRequest,
                message: 'User not found',
                extensions: [
                    {
                        message: 'User not found',
                        field: 'email'
                    }
                ]
            })

        }
        const now = new Date()
        const confirmationCode = randomUUID()
        const expirationDate = add(now, {hours: 1,})
        user.updateEmailConfirmationCode(confirmationCode, expirationDate)
        await this.usersRepository.save(user)
        await this.mailer.sendEmail(email, 'Registration', 'Please, confirm registration', confirmationCode)
    }

    async passwordRecovery(email: string) {
        const user = await this.usersRepository.findUserByLoginOrEmail({login: email, email})
        if (!user) {
            throw new DomainException({
                code: DomainExceptionCode.BadRequest,
                message: 'Login or email is exist'
            })
        }
        const now = new Date()
        const recoveryCode = randomUUID()
        const expirationDate = add(now, {hours: 1,})
        user.setPasswordRecovery(recoveryCode, expirationDate)
        await this.usersRepository.save(user)
        await this.mailer.sendEmail(email, 'Password recovery', 'Please, confirm password recovery', recoveryCode)
    }

}
