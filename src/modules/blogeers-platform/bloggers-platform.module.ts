import {Module} from '@nestjs/common';
import {UserAccountsModule} from '../user-accounts/user-accounts.module';
import {BlogsController} from "./blogs/api/blogs.controller";
import {BlogsRepository} from "./blogs/infrastructure/blogs.repository";
import {BlogsQueryRepository} from "./blogs/infrastructure/query/blogs.query-repository";
import {BlogsService} from "./blogs/application/blogs.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Blog, BlogSchema} from "./blogs/domain/blog.entity";

@Module({
    imports: [UserAccountsModule, MongooseModule.forFeature([{name: Blog.name, schema: BlogSchema}])],
    providers: [BlogsService,BlogsRepository,BlogsQueryRepository],
    controllers:[BlogsController]
})
export class BloggersPlatformModule {
}