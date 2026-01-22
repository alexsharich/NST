import {ConfigService} from '@nestjs/config'
import {ClientConfig} from 'pg'

export function getPGConfig(configService: ConfigService): ClientConfig {
    return {
        host: configService.getOrThrow('POSTGRES_HOST'),
        port: configService.getOrThrow('POSTGRES_PORT'),
        user: configService.getOrThrow('POSTGRES_USER'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        database: configService.getOrThrow('POSTGRES_DB'),
    };
}