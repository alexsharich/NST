import {Injectable} from '@nestjs/common';
import {CreateBlogInputDto} from "../api/input-dto/blogs.input-dto";
import {UpdateBlogInputDto} from "../api/input-dto/update-blog.input-dto";

@Injectable()
export class BlogsService {
    constructor() {
    }

    async createBlog({websiteUrl, description, name}: CreateBlogInputDto) {

    }

    async deleteBlog(id: string) {

    }

    async updateBlog(id: string, updateBlogInputDto: UpdateBlogInputDto) {

    }
}