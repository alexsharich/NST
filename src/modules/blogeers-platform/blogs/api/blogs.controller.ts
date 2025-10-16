import {Body, Controller, Query, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {CreateBlogInputDto} from "./input-dto/blogs.input-dto";
import {BlogsService} from "../application/blogs.service";
import {UpdateBlogInputDto} from "./input-dto/update-blog.input-dto";
import {BlogsQueryRepository} from "../infrastructure/query/blogs.query-repository";
import {GetBlogsQueryParams} from "./input-dto/get-blogs-query-params.input-dto";
import {CreatePostForSelectedBlogInputDto} from "./input-dto/create-post-for-blog.input-dto";


@Controller('blogs')
export class BlogsController {
    constructor(private readonly blogsService: BlogsService, private readonly blogsQueryRepository: BlogsQueryRepository) {
    }

    @Post()
    async createBlog(@Body() createBlogInputDto: CreateBlogInputDto) {
        const blogId = await this.blogsService.createBlog(createBlogInputDto)
        console.log(blogId)
        return this.blogsQueryRepository.getByIdOrNotFoundFail(blogId)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async deleteBlog(@Param('id') id: string) {
        await this.blogsService.deleteBlog(id)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Put(':id')
    async updateBlog(@Param('id') id: string, @Body() updateBlogInputDto: UpdateBlogInputDto) {
        await this.blogsService.updateBlog(id, updateBlogInputDto)
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async getBlog(@Param('id') id: string) {
        return this.blogsQueryRepository.getByIdOrNotFoundFail(id)
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    async getAllBlogs(@Query() queries: GetBlogsQueryParams) {
        return this.blogsQueryRepository.getAll(queries)
    }

    @HttpCode(HttpStatus.OK)
    @Get(':blogId/posts')
    async getPostsForBlog(@Param('blogId') blogId: string, @Query() queries: GetBlogsQueryParams) {
        return this.blogsService.getAllForPost(blogId, queries)
    }

    @Post(':blogId/posts')
    async createPost(@Param('blogId') blogId: string, @Body() createPostForBlogInputDto: CreatePostForSelectedBlogInputDto) {
        return this.blogsService.cratePostForBlog(blogId, createPostForBlogInputDto)
    }
}