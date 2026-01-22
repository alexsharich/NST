import {Inject, Injectable} from "@nestjs/common"
import {Pool, QueryResultRow} from 'pg'

@Injectable()
export class PgService {
    constructor(@Inject('CONNECTION_POOL') private readonly pool: Pool) {
    }

    async runQuery<T extends QueryResultRow>(query: string, params?: unknown[]) {
        return this.pool.query<T>(query, params);
    }
}