import {Global, Module} from "@nestjs/common"
import {ConfigService} from "@nestjs/config"
import {getPGConfig} from "./config/pg.config"
import {PgService} from "./pg.service"
import {Pool} from 'pg'

@Global()
@Module({
    imports: [],
    providers: [
        PgService,
        {
            provide: 'CONNECTION_POOL',
            useFactory: (config: ConfigService) => {
                return new Pool({
                    ...getPGConfig(config),
                });
            },
            inject: [ConfigService],
        },
    ],
    exports: [PgService],
})
export class PgModule {
}