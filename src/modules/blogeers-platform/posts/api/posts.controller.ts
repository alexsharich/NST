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
import {GetCommentsForPostQuery} from "../application/use-cases/get-comments-for-post/get-comments-for-post.command";
import {ChangeLikePostStatusCommand} from "../../likes/likes-posts/aplication/use-cases/change-like-post.command";
import {ChangeStatusDto} from "./input-dto/change-status-dto";
import {CreateNewCommentInputDto} from "./input-dto/create-comment-for-post-dto";
import {UserIdGuard} from "../../../../core/guards/userId.quard";
import {BasicGuard} from "../../../../core/guards/basic.guard";


@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService, private readonly postsQueryRepository: PostsQueryRepository,
                private readonly commandBus: CommandBus,
                private readonly queryBus: QueryBus) {
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Put(':postId/like-status')
    async changeLikePostStatus(@Param('postId') postId: string, @Req() req: Request, @Body() {likeStatus}: ChangeStatusDto) {
        const user = req.user!
        return this.commandBus.execute(new ChangeLikePostStatusCommand(postId, likeStatus, user))
    }

    @UseGuards(BasicGuard)
    @Post()
    async createPost(@Body() createPostInputDto: CreatePostInputDto) {
        return this.postsService.createPost(createPostInputDto)
    }

    @UseGuards(UserIdGuard)
    @UseGuards(AuthGuard)
    @Post(':postId/comments')
    async createPostForBlog(@Body() content: CreateNewCommentInputDto, @Req() req: Request, @Param('postId') postId: string) {
        const userId = req.userId!
        const userLogin = req.user!.login!
        const commentId = await this.commandBus.execute(new CreateCommentCommand(content.content, postId, userId, userLogin))
        return this.queryBus.execute(new GetCommentByIdQuery(commentId))
    }

    @UseGuards(BasicGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        await this.postsService.deletePost(id)
    }

    @UseGuards(BasicGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Put(':id')
    async updatePost(@Param('id') id: string, @Body() updatePostInputDto: UpdatePostInputDto) {
        await this.postsService.updatePost(id, updatePostInputDto)
    }

    @UseGuards(UserIdGuard)
    @Get(':id')
    async getPost(@Param('id') id: string, @Req() req: Request) {
        const userId = req.userId
        return this.postsQueryRepository.getByIdOrNotFoundFail(id, userId || undefined)
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(UserIdGuard)
    @Get()
    async getAll(@Query() queries: GetPostQueryParams, @Req() req: Request) {
        const userId = req.userId
        return this.postsQueryRepository.getAll(queries, undefined, userId || undefined)
    }


    @UseGuards(UserIdGuard)
    @Get(':postId/comments')
    async getCommentsForPost(@Param('postId') postId: string, @Query() queries: GetPostQueryParams, @Req() req: Request) {
        const userId = req?.userId || undefined
        return this.queryBus.execute(new GetCommentsForPostQuery(postId, queries, userId))
    }
}