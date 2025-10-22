import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserAccountsModule} from "./modules/user-accounts/user-accounts.module";
import {BloggersPlatformModule} from "./modules/blogeers-platform/bloggers-platform.module";
import {ClearDBModule} from "./modules/blogeers-platform/clearDB/clear-database.module";
import {ConfigModule} from '@nestjs/config';


@Module({
    imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/'), UserAccountsModule, BloggersPlatformModule, ClearDBModule, ConfigModule.forRoot({isGlobal: true})],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
