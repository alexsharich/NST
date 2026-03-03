import {Injectable} from '@nestjs/common';
import {PgService} from "../../../../core/libs/pg/pg.service";


@Injectable()
export class BlogsRawRepository {
    constructor(private readonly pgService: PgService) {

    }

    async findOneSQL(id: string) {
        const res = await this.pgService.runQuery<{ id: string }>(`
            SELECT
            FROM blogs
            WHERE id = $1
              AND "deletedAt" IS NULL RETURNING id
        `, [id])
        return res?.rows?.[0]// return blog
    }
}