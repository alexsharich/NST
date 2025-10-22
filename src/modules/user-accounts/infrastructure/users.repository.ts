import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument, UserModelType} from "../domain/user.entity";
import {RegistrationConfirmationCode} from "../api/input-dto/registration-confirmation-code";

@Injectable()
export class UsersRepository {
    constructor(@InjectModel(User.name) private readonly userModel: UserModelType) {

    }

    async save(user: UserDocument) {
        await user.save()
        return user._id.toString()
    }

    async findOne(id: string) {
        return this.userModel.findOne({_id: id, deletedAt: null})
    }

    async findUserByLoginOrEmail({login, email}: { login: string, email: string }) {
        return this.userModel.findOne({$or: [{login}, {email}], deletedAt: null})
    }

    async findUserByConfirmationCode(confirmationCode: RegistrationConfirmationCode) {
        return this.userModel.findOne({'emailConfirmation.confirmationCode': confirmationCode})
    }

    async findUserByRecoveryCode(recoveryCode: RegistrationConfirmationCode) {
        return this.userModel.findOne({recoveryCode})
    }

}