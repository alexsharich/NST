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
import {CreateCommandHandler} from "./comments/application/use-cases/create-comment/create-command.handler";
import {CommentSchema, Comment} from "./comments/domain/comment.entity";
import {CommentsRepository} from "./comments/infrastructure/comments.repository";
import {User, UserSchema} from "../user-accounts/domain/user.entity";
import {JwtService} from "../../application/jwt.service";
import {UsersRepository} from "../user-accounts/infrastructure/users.repository";
import {
    GetCommentByIdQueryHandler
} from "./comments/application/queries/get-comment-by-id/get-comment-by-id.query.handler";
import {CommentsQueryRepository} from "./comments/infrastructure/query/comments.query-repository";
import {CommentsController} from "./comments/api/comments.controller";
import {UpdateCommentCommandHandler} from './comments/application/use-cases/update-comment/update-comment.handler';
import {
    DeleteCommentCommandHandler
} from "./comments/application/use-cases/delete-comment/delete-comment-command.handler";
import {
    ChangeLikeStatusCommandHandler
} from "./comments/application/use-cases/change-like-status/change-like-status.command.handler";
import {
    GetCommentsForPostQueryHandler
} from "./posts/application/use-cases/get-comments-for-post/get-comments-for-post.command.handler";

const commands = [CreateCommandHandler, UpdateCommentCommandHandler, DeleteCommentCommandHandler, ChangeLikeStatusCommandHandler]
const queries = [GetCommentByIdQueryHandler,GetCommentsForPostQueryHandler]

@Module({
    imports: [UserAccountsModule,
        MongooseModule.forFeature([
            {name: Blog.name, schema: BlogSchema},
            {
                name: Post.name, schema: PostSchema
            },

            {
                name: Comment.name,
                schema: CommentSchema
            },
            {
                name: User.name,
                schema: UserSchema
            }])],
    providers: [BlogsService, JwtService, UsersRepository, BlogsRepository, CommentsRepository, CommentsQueryRepository, BlogsQueryRepository, PostsRepository, PostsQueryRepository, PostsService, ...commands, ...queries],
    controllers: [BlogsController, PostsController, CommentsController]
})
export class BloggersPlatformModule {
}