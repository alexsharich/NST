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
import {LikeComment, LikeCommentSchema} from "./likes/likes-comments/domain/like-comment.entity";
import {LikesRepository} from "./likes/likes-comments/infrastructure/like-comment.repository";
import {ChangeLikePostCommandHandler} from "./likes/likes-posts/aplication/use-cases/change-like-post.command.handler";
import {LikePost, LikePostSchema} from "./likes/likes-posts/domain/like-post.entity";
import {LikesPostRepository} from "./likes/likes-posts/infrastructure/like-post.repository";
import {ThrottlerModule} from "@nestjs/throttler";

const commands = [CreateCommandHandler, UpdateCommentCommandHandler, ChangeLikeStatusCommandHandler, DeleteCommentCommandHandler, ChangeLikePostCommandHandler]
const queries = [GetCommentByIdQueryHandler, GetCommentsForPostQueryHandler]

@Module({
    imports: [UserAccountsModule,
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    ttl: 10000,
                    limit: 5,
                },
            ],
        }),
        MongooseModule.forFeature([
            {
                name: Blog.name,
                schema: BlogSchema
            },
            {
                name: Post.name,
                schema: PostSchema
            },

            {
                name: Comment.name,
                schema: CommentSchema
            },
            {
                name: LikePost.name,
                schema: LikePostSchema
            },
            {
                name: LikeComment.name,
                schema: LikeCommentSchema
            },
            {
                name: User.name,
                schema: UserSchema
            }])],
    providers: [BlogsService, JwtService, UsersRepository, LikesRepository, BlogsRepository, CommentsRepository, CommentsQueryRepository, BlogsQueryRepository, PostsRepository, PostsQueryRepository, LikesPostRepository, PostsService, ...commands, ...queries],
    controllers: [BlogsController, PostsController, CommentsController]
})
export class BloggersPlatformModule {
}