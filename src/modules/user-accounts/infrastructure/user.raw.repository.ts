import {Injectable} from '@nestjs/common';
import {PgService} from "../../../core/libs/pg/pg.service";

@Injectable()
export class UsersRawRepository {
    constructor(private readonly pgService: PgService) {

    }

    async createUserSQL(login: string, passwordHash: string, email: string) {
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
            `, [recoveryCode]
        )
        return res?.rows?.[0]
    }
    async deleteUserSQL(id: string): Promise<boolean> {
        const res = await this.pgService.runQuery(`
        UPDATE users 
        SET "deletedAt" = NOW() 
        WHERE id = $1 AND "deletedAt" IS NULL
    `, [id]);
        return (res?.rowCount ?? 0) > 0;
    }
}