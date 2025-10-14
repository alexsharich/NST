import {Body, Controller, Query, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {CreatePostInputDto} from "./input-dto/posts.input-dto";
import {UpdatePostInputDto} from "./input-dto/update-post.input-dto";
import {GetPostQueryParams} from "./input-dto/get-post-query-params.input-dto";
import {PostsService} from "../application/posts.service";
import {PostsQueryRepository} from "../infrastructure/query/posts-query-repository";

@Controller('posts')
export class UsersController {
    constructor(private readonly postsService: PostsService, private readonly postsQueryRepository: PostsQueryRepository) {
    }

    @Post()
    async createPost(@Body() createPostInputDto: CreatePostInputDto) {
        await this.postsService.createPost(createPostInputDto)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        await this.postsService.deletePost(id)
    }

    @Put(':id')
    async updatePost(@Param('id') id: string, @Body() updatePostInputDto: UpdatePostInputDto) {
        await this.postsService.updatePost(id, updatePostInputDto)
    }

    @Get(':id')
    async getPost(@Param('id') id: string) {

    }

    @Get()
    async getAll() {

    }

    @Get(':postId/comments')
    async getCommentsForPost(@Param('postId') postId: string, queries: GetPostQueryParams) {

    }
}