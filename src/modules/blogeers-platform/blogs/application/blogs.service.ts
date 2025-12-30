import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateBlogInputDto} from "../api/input-dto/blogs.input-dto";
import {UpdateBlogInputDto} from "../api/input-dto/update-blog.input-dto";
import {Blog, BlogModelType} from "../domain/blog.entity";
import {InjectModel} from "@nestjs/mongoose";
import {BlogsRepository} from "../infrastructure/blogs.repository";
import {BlogsQueryRepository} from "../infrastructure/query/blogs.query-repository";
import {Post, PostModelType} from "../../posts/domain/post.entity";
import {PostsRepository} from "../../posts/infrastructure/posts.repository";
import {CreatePostForSelectedBlogInputDto} from "../api/input-dto/create-post-for-blog.input-dto";
import {PostsQueryRepository} from "../../posts/infrastructure/query/posts-query-repository";
import {GetBlogsQueryParams} from "../api/input-dto/get-blogs-query-params.input-dto";
import {PostViewDto} from "../../posts/api/view-dto/post.view-dto";

@Injectable()
export class BlogsService {
    constructor(@InjectModel(Blog.name) private readonly BlogModel: BlogModelType,
                @InjectModel(Post.name) private readonly PostModel: PostModelType,
                private readonly postsRepository: PostsRepository,
                private readonly postsQueryRepository: PostsQueryRepository,
                private readonly blogsQueryRepository: BlogsQueryRepository,
                private readonly blogsRepository: BlogsRepository) {
    }

    async createBlog({websiteUrl, description, name}: CreateBlogInputDto): Promise<string> {
        const blog = this.BlogModel.createInstance({websiteUrl, description, name})
        return this.blogsRepository.save(blog)
    }

    async cratePostForBlog(blogId: string, {title, shortDescription, content}: CreatePostForSelectedBlogInputDto) {
        const blog = await this.blogsRepository.findOne(blogId)
        if (!blog) {
            throw new NotFoundException('Blog not found')
        }
        const post = this.PostModel.createInstance({
            title,
            shortDescription,
            content,
            blogId,
            blogName: blog.name
        })
        const postId = await this.postsRepository.save(post)
        return this.postsQueryRepository.getByIdOrNotFoundFail(postId)

    }

    async getAllForPost(blogId: string, queries: GetBlogsQueryParams, userId?: string) {
        const blog = await this.blogsQueryRepository.getByIdOrNotFoundFail(blogId)
        if (!blog) {
            throw new NotFoundException('Blog not found')
        }
        return await this.postsQueryRepository.getAll(queries, blog.id, userId)
    }

    async deleteBlog(id: string) {
        const blog = await this.blogsRepository.findOne(id)
        if (!blog) {
            throw new NotFoundException('Blog not found')
        }
        blog.makeDeleted()
        await this.blogsRepository.save(blog)
    }

    async updateBlog(id: string, updateBlogInputDto: UpdateBlogInputDto) {
        const blog = await this.blogsRepository.findOne(id)
        if (!blog) {
            throw new NotFoundException('Blog not found')
        }
        blog.update(updateBlogInputDto)
        await this.blogsRepository.save(blog)
    }
}