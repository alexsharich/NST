import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Blog, BlogDocument, BlogModelType} from "../domain/blog.entity";

@Injectable()
export class BlogsRepository {
    constructor(@InjectModel(Blog.name) private readonly blogModel: BlogModelType) {

    }

    async save(blog: BlogDocument) {
        await blog.save()
        return blog._id.toString()
    }

    async findOne(id: string) {
        /*
        SELECT FROM blogs WHERE id = id AND "deletedAt" IS NULL
        * */
        return this.blogModel.findOne({_id: id, deletedAt: null})
    }
}