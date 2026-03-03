import {Injectable} from '@nestjs/common';
import {PgService} from "../../../core/libs/pg/pg.service";

@Injectable()
export class UsersRawRepository {
    constructor(private readonly pgService: PgService) {

    }

    async createUser(login: string, passwordHash: string, email: string) {
        const res = await this.pgService.runQuery<{ id: string }>(`
            INSERT INTO users (login, "passwordHash", email)
            VALUES ($1, $2, $3) RETURNING id
        `, [login, passwordHash, email])
        return res?.rows?.[0].id // return userId
    }

    async findOneSQL(userId: string) {
        const res = await this.pgService.runQuery<{ id: string, login: string, email: string, createdAt: any }>(
            `
                SELECT id, login, email, "createdAt"
                FROM users
                WHERE id = $1
                /*RETURNING id, login, email, "createdAt"*/
            `, [userId]
        )
        return res?.rows?.[0]
    }

    async findUserByLoginSQL(login: string) {
        const res = await this.pgService.runQuery<{ id: string, login: string, email: string, createdAt: any }>(
            `
                SELECT id, login, email, "createdAt"
                FROM users
                WHERE login = $1
                /*RETURNING id, login, email, "createdAt"*/
            `, [login]
        )
        return res?.rows?.[0]
    }

    async findUserByLoginOrEmailSQL(loginOrEmail: string) {
        const res = await this.pgService.runQuery<{ id: string, login: string, email: string, createdAt: any }>(
            `
                SELECT id, login, email, "createdAt"
                FROM users
                WHERE login = $1
                   OR email = $1
                /*RETURNING id, login, email, "createdAt"*/
            `, [loginOrEmail]
        )
        return res?.rows?.[0]
    }

    async findUserByEmailSQL(email: string) {
        const res = await this.pgService.runQuery<{ id: string, login: string, email: string, createdAt: any }>(
            `
                SELECT id, login, email, "createdAt"
                FROM users
                WHERE email = $1
                /*RETURNING id, login, email, "createdAt"*/
            `, [email]
        )
        return res?.rows?.[0]
    }

    async findUserByConfirmationCodeSQL(confirmationCode: string) {
        const res = await this.pgService.runQuery<{ id: string, login: string, email: string, createdAt: any }>(
            `
                SELECT id, login, email, "createdAt"
                FROM users
                WHERE "emailConfirmation"."confirmationCode" = $1
                /*RETURNING id, login, email, "createdAt"*/
            `, [confirmationCode]
        )
        return res?.rows?.[0]
    }

    async findUserByRecoveryCodeSQL(recoveryCode: string) {
        const res = await this.pgService.runQuery<{ id: string, login: string, email: string, createdAt: any }>(
            `
                SELECT id, login, email, "createdAt"
                FROM users
                WHERE "passwordRecovery"."recoveryCode" = $1
                /*RETURNING id, login, email, "createdAt"*/
            `, [recoveryCode]
        )
        return res?.rows?.[0]
    }
}