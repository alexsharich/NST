import {InjectModel} from '@nestjs/mongoose';
import {Injectable, NotFoundException} from '@nestjs/common';
import {PaginatedViewDto} from "../../../../core/dto/base.paginated.view-dto";
import {FilterQuery} from "mongoose";
import {Blog, BlogModelType} from "../../domain/blog.entity";
import {BlogViewDto} from "../../api/view-dto/blog.view-dto";
import {GetBlogsQueryParams} from "../../api/input-dto/get-blogs-query-params.input-dto";

@Injectable()
export class BlogsQueryRepository {
    constructor(
        @InjectModel(Blog.name) private readonly BlogModel: BlogModelType
    ) {
    }

    async getByIdOrNotFoundFail(id: string): Promise<BlogViewDto> {
        const blog = await this.BlogModel.findById(id)
        if (!blog) {
            throw new NotFoundException('Blog not found')//404
        }
        return BlogViewDto.mapToView(blog)
    }

    async getAll(queries: GetBlogsQueryParams) {
        const filter: FilterQuery<Blog> = {
            deletedAt: null,
        };

        const users = await this.BlogModel
            .find(filter)
            .sort({[queries.sortBy]: queries.sortDirection})
            .skip(queries.calculateSkip())
            .limit(queries.pageSize);

        const totalCount = await this.BlogModel.countDocuments(filter);

        const items = users.map(BlogViewDto.mapToView);
        return PaginatedViewDto.mapToView({
            items,
            totalCount,
            page: queries.pageNumber,
            size: queries.pageSize,
        });
    }
}