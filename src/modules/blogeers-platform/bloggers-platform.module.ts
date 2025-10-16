import {Module} from '@nestjs/common';
import {UserAccountsModule} from '../user-accounts/user-accounts.module';
import {BlogsController} from "./blogs/api/blogs.controller";
import {BlogsRepository} from "./blogs/infrastructure/blogs.repository";
import {BlogsQueryRepository} from "./blogs/infrastructure/query/blogs.query-repository";
import {BlogsService} from "./blogs/application/blogs.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Blog, BlogSchema} from "./blogs/domain/blog.entity";
import {Post, PostSchema} from "./posts/domain/post.entity";
import {PostsRepository} from "./posts/infrastructure/posts.repository";
import {PostsQueryRepository} from "./posts/infrastructure/query/posts-query-repository";
import {PostsService} from "./posts/application/posts.service";
import {PostsController} from "./posts/api/posts.controller";

@Module({
    imports: [UserAccountsModule, MongooseModule.forFeature([{name: Blog.name, schema: BlogSchema}, {
        name: Post.name,
        schema: PostSchema
    }])],
    providers: [BlogsService, BlogsRepository, BlogsQueryRepository, PostsRepository, PostsQueryRepository, PostsService],
    controllers: [BlogsController, PostsController]
})
export class BloggersPlatformModule {
}