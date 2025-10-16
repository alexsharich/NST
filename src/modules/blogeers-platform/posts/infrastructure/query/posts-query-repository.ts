import {InjectModel} from '@nestjs/mongoose';
import {Injectable, NotFoundException} from '@nestjs/common';
import {Post, PostModelType} from "../../domain/post.entity";
import {PostViewDto} from "../../api/view-dto/post.view-dto";
import {GetPostQueryParams} from "../../api/input-dto/get-post-query-params.input-dto";
import {FilterQuery} from "mongoose";
import {PaginatedViewDto} from "../../../../../core/dto/base.paginated.view-dto";

@Injectable()
export class PostsQueryRepository {
    constructor(@InjectModel(Post.name) private readonly PostModel: PostModelType) {
    }

    async getByIdOrNotFoundFail(id: string): Promise<PostViewDto> {
        const blog = await this.PostModel.findOne({_id: id, deletedAt: null})
        if (!blog) {
            throw new NotFoundException('Blog not found')//404
        }
        return PostViewDto.mapToView(blog)
    }

    async getAll(queries: GetPostQueryParams, blogId?: string,) {
        let filter: FilterQuery<Post> = {
            deletedAt: null,
        };
        if (blogId) {
            filter = {...filter, blogId}
        }

        if (queries.searchNameTerm) {
            filter.$or = filter.$or || [];
            filter.$or.push({
                login: {$regex: queries.searchNameTerm, $options: 'i'},
            });
        }

        const blogs = await this.PostModel//отфильтровать по id
            .find(filter)
            .sort({[queries.sortBy]: queries.sortDirection})
            .skip(queries.calculateSkip())
            .limit(queries.pageSize);

        const totalCount = await this.PostModel.countDocuments(filter);

        const items = blogs.map(PostViewDto.mapToView);
        return PaginatedViewDto.mapToView({
            items,
            totalCount,
            page: queries.pageNumber,
            size: queries.pageSize,
        });
    }
}