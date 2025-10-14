import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateBlogInputDto} from "../api/input-dto/blogs.input-dto";
import {UpdateBlogInputDto} from "../api/input-dto/update-blog.input-dto";
import {Blog, BlogModelType} from "../domain/blog.entity";
import {InjectModel} from "@nestjs/mongoose";
import {BlogsRepository} from "../infrastructure/blogs.repository";

@Injectable()
export class BlogsService {
    constructor(@InjectModel(Blog.name) private readonly BlogModel: BlogModelType, private readonly blogsRepository: BlogsRepository) {
    }

    async createBlog({websiteUrl, description, name}: CreateBlogInputDto): Promise<string> {
        const blog = this.BlogModel.createInstance({websiteUrl, description, name})
        return this.blogsRepository.save(blog)
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
        if(!blog){
            throw new NotFoundException('Blog not found')
        }
        blog.update(updateBlogInputDto)
        await this.blogsRepository.save(blog)
    }
}