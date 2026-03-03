import {Injectable} from '@nestjs/common';
import {PgService} from "../../../../core/libs/pg/pg.service";

@Injectable()
export class PostsRawRepository {
    constructor(private readonly pgService: PgService) {

    }


    async findOneSQL(id: string) {
        const res = await this.pgService.runQuery<{id:string}>(`
            SELECT *
            FROM posts
            WHERE id = $1
              AND deletedAt NOT NULL
            RETURNING id
        `, [])
        return res?.rows?.[0].id
    }

}