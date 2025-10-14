import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserAccountsModule} from "./modules/user-accounts/user-accounts.module";
import {BloggersPlatformModule} from "./modules/blogeers-platform/bloggers-platform.module";


@Module({
    imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/'),UserAccountsModule, BloggersPlatformModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
