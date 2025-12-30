import {InjectModel} from '@nestjs/mongoose';
import {Injectable, NotFoundException} from '@nestjs/common';
import {Post, PostModelType} from "../../domain/post.entity";
import {PostViewDto} from "../../api/view-dto/post.view-dto";
import {GetPostQueryParams} from "../../api/input-dto/get-post-query-params.input-dto";
import {FilterQuery} from "mongoose";
import {PaginatedViewDto} from "../../../../../core/dto/base.paginated.view-dto";
import {LikePost, LikePostModelType} from "../../../likes/likes-posts/domain/like-post.entity";

@Injectable()
export class PostsQueryRepository {
    constructor(@InjectModel(Post.name) private readonly PostModel: PostModelType,
                @InjectModel(LikePost.name) private readonly LikePostModel: LikePostModelType
    ) {
    }

    async getByIdOrNotFoundFail(id: string, userId?: string): Promise<PostViewDto> {
        const post = await this.PostModel.findOne({_id: id, deletedAt: null})

        if (!post) {
            throw new NotFoundException('Post not found')
        }
        const likes = await this.LikePostModel.find().sort({createdAt: -1})
        const currentLike = likes.find((l) => l.postId === id && userId === l.userId)
        const latestLikes = likes.filter(l => l.postId === id).slice(0, 3)

        return PostViewDto.mapToView(post, currentLike?.myStatus, latestLikes)
    }

    async getAll(queries: GetPostQueryParams, postId?: string, userId?: string) {
        let filter: FilterQuery<Post> = {
            deletedAt: null,
        };
        if (postId) {
            filter = {...filter, postId}
        }

        if (queries.searchNameTerm) {
            filter.$or = filter.$or || [];
            filter.$or.push({
                login: {$regex: queries.searchNameTerm, $options: 'i'},
            });
        }

        const posts = await this.PostModel//отфильтровать по id
            .find(filter)
            .sort({[queries.sortBy]: queries.sortDirection})
            .skip(queries.calculateSkip())
            .limit(queries.pageSize);

        const totalCount = await this.PostModel.countDocuments(filter);
        const likes = await this.LikePostModel.find().sort({createdAt: -1})

        const items = posts.map((p) => {
            const latestLikes = likes.filter(l => l.postId === String(p._id)).slice(0, 3)
            const currentLike = likes.find((l) => l.postId === String(p._id) && userId === l.userId)
            return PostViewDto.mapToView(p, currentLike?.myStatus, latestLikes)
        });

        return PaginatedViewDto.mapToView({
            items,
            totalCount,
            page: queries.pageNumber,
            size: queries.pageSize,
        });
    }
}