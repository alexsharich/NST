import {Injectable} from "@nestjs/common";
import {CreateUserInputDto} from "../api/input-dto/users.input-dto";
import {UsersRepository} from "../infrastructure/users.repository";
import {DomainException} from "../../../core/exceptions/domain-exceptions";
import {DomainExceptionCode} from "../../../core/exceptions/domain-exceptions-codes";
import {UserModelType} from "../domain/user.entity";
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository, private readonly userModel: UserModelType) {

    }

    async registration({login, password, email}: CreateUserInputDto) {
        const user = await this.usersRepository.findUserByLoginOrEmail({login, email})
        if (user) {
            throw new DomainException({code: DomainExceptionCode.BadRequest, message: 'Login or email is exist'})
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt)
        const newUser = this.userModel.createInstance({login, passwordHash, email})
        await this.usersRepository.save(newUser)
    }

}