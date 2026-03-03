import {Controller, Delete, HttpCode, HttpStatus,} from '@nestjs/common';

import {PgService} from "../../../core/libs/pg/pg.service";

@Controller('testing/all-data')
export class ClearDBRawController {
    constructor(private readonly pgService: PgService) {
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete()
    async clearDataBase() {
        const res = await this.pgService.runQuery<{}>(`
            TRUNCATE TABLE posts, blogs, users RESTART IDENTITY CASCADE
            `, [])
        return
    }
}


