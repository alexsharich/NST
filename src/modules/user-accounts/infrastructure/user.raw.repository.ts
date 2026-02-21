import {Injectable} from '@nestjs/common';
import {RegistrationConfirmationCode} from "../api/input-dto/registration-confirmation-code";
import {PgService} from "../../../core/libs/pg/pg.service";

@Injectable()
export class UsersRawRepository {
    constructor(private readonly pgService: PgService) {

    }

    async createUser(login:string,passwordHash:string,email:string) {
        const res = await this.pgService.runQuery<{id:string}>(`
            INSERT INTO users (login, "passwordHash", email)
            VALUES ($1, $2, $3) 
            RETURNING id
        `, [login,passwordHash,email])
        const userId = res?.rows?.[0].id
        return userId
    }

    /*async findOne(id: string) {
        return this.userModel.findOne({_id: id, deletedAt: null})
    }

    async findUserByLogin(login: string) {
        return this.userModel.findOne({login, deletedAt: null})
    }

    async findUserByLoginOrEmail(loginOrEmail: string) {
        return this.userModel.findOne({$or: [{login: loginOrEmail}, {email: loginOrEmail}]})
    }

    async findUserByEmail(email: string) {
        return this.userModel.findOne({email, deletedAt: null})
    }

    async findUserByConfirmationCode(confirmationCode: RegistrationConfirmationCode) {
        return this.userModel.findOne({'emailConfirmation.confirmationCode': confirmationCode.code})
    }

    async findUserByRecoveryCode(recoveryCode: string) {
        return this.userModel.findOne({'passwordRecovery.recoveryCode': recoveryCode})
    }*/

}