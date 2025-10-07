/*
import {Injectable} from "@nestjs/common";
import {UsersRepository} from "./users.repository";
import {InputUserType} from "./users.controller";

@Injectable()
export class UsersService {
    constructor(protected usersRepository: UsersRepository) {
    }
    deleteUser(id:string){
        return this.usersRepository.deleteUser(id)
    }
    createUser(user: InputUserType, isAdmin: boolean = false){
        const errors = []
        const isUnique = this.usersRepository.checkUniqUserWithEmailOrLogin(user.login, user.email)
        if (isUnique) {
            if (isUnique.accountData.email === user.email) {
                errors.push({field: 'email', message: 'email should be unique'})
            }
            if (isUnique.accountData.userName === user.login) {
                errors.push({field: 'login', message: 'login should be unique'})
            }
            return errors
        }
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(user.password, salt)
        const now = new Date()

        const newUser = {
            _id: new ObjectId(),
            accountData: {
                userName: user.login,
                email: user.email,
                passwordHash,
                createdAt: new Date()
            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(now, {
                    hours: 1,
                }),
                isConfirmed: isAdmin ? true : false
            }
        }
        return this.usersRepository.createNewUser(newUser)
    }
}*/
