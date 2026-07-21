import {Injectable, NotFoundException} from '@nestjs/common';
import {UsersRepository} from '../infrastructure/users.repository';
import {CreateUserInputDto} from "../api/input-dto/users.input-dto";
import {User, UserModelType} from "../domain/user.entity";
import bcrypt from "bcrypt";
import {InjectModel} from "@nestjs/mongoose";
import {UsersRawRepository} from "../infrastructure/user.raw.repository";

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UsersRepository,
                private readonly userRawRepository: UsersRawRepository,
                @InjectModel(User.name) private readonly userModel: UserModelType) {
    }

    async createUser({
                         login,
                         password,
                         email
                     }: CreateUserInputDto, confirmationCode = null, expirationDate = null) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt)
        const newUser = this.userModel.createInstance({login, passwordHash, email}, confirmationCode, expirationDate)
        return this.userRepository.save(newUser)
    }

    async deleteUser(id: string) {
        // const user = await this.userRawRepository.findOneSQL(id)
        // if (!user) {
        //     throw new NotFoundException('User not found')
        // }
        /*user.makeDeleted()*/
        //обновить upadte Table user save* (upsert)
        //await this.userRepository.save(user)
        await this.userRawRepository.deleteUserSQL(id)
    }
}