import {Body, Controller, Query, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {CreateBlogInputDto} from "./input-dto/blogs.input-dto";
import {BlogsService} from "../application/blogs.service";
import {UpdateBlogInputDto} from "./input-dto/update-blog.input-dto";
import {BlogsQueryRepository} from "../infrastructure/query/blogs.query-repository";
import {GetBlogsQueryParams} from "./input-dto/get-blogs-query-params.input-dto";
import {GetUsersQueryParams} from "../../user-accounts/api/input-dto/get-users-query-params.input-dto";
import {CreatePostForSelectedBlogInputDto} from "./input-dto/create-post-for-blog.input-dto";


@Controller('blogs')
export class BlogsController {
    constructor(private readonly blogsService: BlogsService, private readonly blogsQueryRepository: BlogsQueryRepository) {
    }

    @Post()
    async createBlog(@Body() createBlogInputDto: CreateBlogInputDto) {
        const blogId = await this.blogsService.createBlog(createBlogInputDto)
        //return this.blogsQueryRepository.getByIdOrNotFoundFail(blogId)

    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete()
    async deleteBlog(@Param('id') id: string) {
        await this.blogsService.deleteBlog(id)
    }

    @Put()
    async updateBlog(@Param('id') id: string, @Body() updateBlogInputDto: UpdateBlogInputDto) {//todo match with createBlogDto
        await this.blogsService.updateBlog(id, updateBlogInputDto)
    }

    @Get()
    async getBlog(@Param('id') id: string) {
        await this.blogsQueryRepository.getByIdOrNotFoundFail(id)//или напрямую через квери репо
    }

    @Get()
    async getAllBlogs(@Query() queries: GetBlogsQueryParams) {
        await this.blogsQueryRepository.getAll(queries)
    }

    @Get()
    async getPostsForBlog(@Param(':blogId/posts') blogId: string, queries: GetBlogsQueryParams) {

    }

    @Post()
    async createPost(@Param(':blogId/posts') blogId: string, @Body() createPostForBlogInputDto: CreatePostForSelectedBlogInputDto) {
        const blog = await this.blogsQueryRepository.getByIdOrNotFoundFail(blogId)

    }
}