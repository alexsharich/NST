import {Injectable, NotFoundException} from '@nestjs/common';
import {UsersRepository} from '../infrastructure/users.repository';
import {CreateUserInputDto} from "../api/input-dto/users.input-dto";
import {User, UserModelType} from "../domain/user.entity";
import bcrypt from "bcrypt";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UsersRepository,@InjectModel(User.name) private readonly userModel:UserModelType) {
    }
    async createUser({login, password, email}: CreateUserInputDto) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt)
        const newUser = this.userModel.createInstance({login, passwordHash, email})
        return this.userRepository.save(newUser)
    }
    async deleteUser(id:string){
        const user = await this.userRepository.findOne(id)
        if(!user){
            throw new NotFoundException('User not found')
        }
        user.makeDeleted()
        await this.userRepository.save(user)
    }
}