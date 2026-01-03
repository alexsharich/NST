import {InjectModel} from '@nestjs/mongoose';
import {Injectable, NotFoundException} from '@nestjs/common';
import {Post, PostModelType} from "../../domain/post.entity";
import {PostViewDto} from "../../api/view-dto/post.view-dto";
import {GetPostQueryParams} from "../../api/input-dto/get-post-query-params.input-dto";
import {FilterQuery} from "mongoose";
import {PaginatedViewDto} from "../../../../../core/dto/base.paginated.view-dto";
import {LikePost, LikePostModelType} from "../../../likes/likes-posts/domain/like-post.entity";
import {LikeStatus} from "../../../../../core/dto/like.status";
import {Comment, CommentModelType} from "../../../comments/domain/comment.entity";
import {LikeComment, LikeCommentModelType} from "../../../likes/likes-comments/domain/like-comment.entity";
import {CommentViewDto} from "../../../comments/api/view-dto/comment-view.dto";

@Injectable()
export class PostsQueryRepository {
    constructor(@InjectModel(Post.name) private readonly postModel: PostModelType,
                @InjectModel(LikePost.name) private readonly likePostModel: LikePostModelType,
                @InjectModel(Comment.name) private readonly commentModel: CommentModelType,
                @InjectModel(LikeComment.name) private readonly likeCommentModel: LikeCommentModelType,
    ) {
    }

    async getByIdOrNotFoundFail(id: string, userId?: string): Promise<PostViewDto> {
        const post = await this.postModel.findOne({_id: id, deletedAt: null})

        if (!post) {
            throw new NotFoundException('Post not found')
        }
        const likes = await this.likePostModel.find().sort({createdAt: -1})
        const currentLike = likes.find((l) => l.postId === id && userId === l.userId)
        const latestLikes = likes.filter(l => l.postId === id && l.myStatus === LikeStatus.Like).slice(0, 3)

        return PostViewDto.mapToView(post, currentLike?.myStatus, latestLikes)
    }

    async getCommentsForPost(postId: string, queries: GetPostQueryParams, userId?: string) {
        const post = await this.postModel.findOne({_id: postId, deletedAt: null})
        if (!post) {
            throw new NotFoundException('Post not found')
        }

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

        const posts = await this.commentModel
            .find(filter)
            .sort({[queries.sortBy]: queries.sortDirection})
            .skip(queries.calculateSkip())
            .limit(queries.pageSize);
        const totalCount = await this.commentModel.countDocuments(filter);
        const likes = await this.likeCommentModel.find().sort({createdAt: -1})

        const items = posts.map((p) => {
            const currentLike = likes.find((l) => l.commentId === String(p._id) && userId === l.userId)
            return CommentViewDto.mapToView(p, currentLike?.myStatus)
        });

        return PaginatedViewDto.mapToView({
            items,
            totalCount,
            page: queries.pageNumber,
            size: queries.pageSize,
        });
    }


    async getAll(queries: GetPostQueryParams, blogId?: string, userId?: string,) {
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

        const posts = await this.postModel//отфильтровать по id
            .find(filter)
            .sort({[queries.sortBy]: queries.sortDirection})
            .skip(queries.calculateSkip())
            .limit(queries.pageSize);

        const totalCount = await this.postModel.countDocuments(filter);
        const likes = await this.likePostModel.find().sort({createdAt: -1})

        const items = posts.map((p) => {
            const latestLikes = likes.filter(l => l.postId === String(p._id) && l.myStatus === LikeStatus.Like).slice(0, 3)
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