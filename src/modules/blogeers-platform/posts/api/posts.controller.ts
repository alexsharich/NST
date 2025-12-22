import {
    Body,
    Controller,
    Query,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    UseGuards,
    Req
} from '@nestjs/common';
import {Request} from "express";
import {CreatePostInputDto} from "./input-dto/posts.input-dto";
import {UpdatePostInputDto} from "./input-dto/update-post.input-dto";
import {GetPostQueryParams} from "./input-dto/get-post-query-params.input-dto";
import {PostsService} from "../application/posts.service";
import {PostsQueryRepository} from "../infrastructure/query/posts-query-repository";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CreateCommentCommand} from "../../comments/application/use-cases/create-comment/create-comment.command";
import {AuthGuard} from "../../../../core/guards/auth.guard";
import {GetCommentByIdQuery} from "../../comments/application/queries/get-comment-by-id/get-comment-by-id.query";
import {
    UpdatePostLikeStatusCommand
} from "../application/use-cases/update-post-like-status/update-post-like-status.command";
import {LikeStatusType} from "../../comments/domain/comment.entity";
import {GetCommentsForPostQuery} from "../application/use-cases/get-comments-for-post/get-comments-for-post.command";


@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService, private readonly postsQueryRepository: PostsQueryRepository,
                private readonly commandBus: CommandBus,
                private readonly queryBus: QueryBus) {
    }

    @Put(':postId/like-status')
    async changeLikePostStatus(@Param('postId') postId: string, @Body('likeStatus') likeStatus: LikeStatusType) {
        return this.commandBus.execute(new UpdatePostLikeStatusCommand(likeStatus, postId))
    }

    @Post()
    async createPost(@Body() createPostInputDto: CreatePostInputDto) {
        return this.postsService.createPost(createPostInputDto)
    }

    @UseGuards(AuthGuard)
    //TODO DTO с валидация
    @Post(':postId/comments')
    async createPostForBlog(@Body('content') content: string, @Req() req: Request, @Param('postId') postId: string) {
        const userId = req.userId!
        const userLogin = req.user!.login!
        const commentId = await this.commandBus.execute(new CreateCommentCommand(content, postId, userId, userLogin))
        return this.queryBus.execute(new GetCommentByIdQuery(commentId))
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        await this.postsService.deletePost(id)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Put(':id')
    async updatePost(@Param('id') id: string, @Body() updatePostInputDto: UpdatePostInputDto) {
        await this.postsService.updatePost(id, updatePostInputDto)
    }

    @Get(':id')
    async getPost(@Param('id') id: string) {
        return this.postsQueryRepository.getByIdOrNotFoundFail(id)
    }


    @HttpCode(HttpStatus.OK)
    @Get()
    async getAll(@Query() queries: GetPostQueryParams) {
        return this.postsQueryRepository.getAll(queries)
    }

    //TODO
    @Get(':postId/comments')
    async getCommentsForPost(@Param('postId') postId: string, @Query() queries: GetPostQueryParams) {
        return this.queryBus.execute(new GetCommentsForPostQuery(postId, queries))
    }
}