import {InjectModel} from '@nestjs/mongoose';
import {Injectable, NotFoundException} from '@nestjs/common';
import {Post, PostModelType} from "../../domain/post.entity";
import {PostViewDto} from "../../api/view-dto/post.view-dto";
import {GetPostQueryParams} from "../../api/input-dto/get-post-query-params.input-dto";

@Injectable()
export class PostsQueryRepository {
    constructor(@InjectModel(Post.name) private readonly PostModel: PostModelType) {
    }

    async getByIdOrNotFoundFail(id: string): Promise<PostViewDto> {
        const blog = await this.PostModel.findById(id)
        if (!blog) {
            throw new NotFoundException('Blog not found')//404
        }
        return PostViewDto.mapToView(blog)
    }

    async getAll(queries: GetPostQueryParams) {

    }
}