import {PostDocument} from "../../domain/post.entity";
import {LikeStatus} from "../../../../../core/dto/like.status";
import {LikePostDocument} from "../../../likes/likes-posts/domain/like-post.entity";


type LikeInfo = {
    addedAt: Date,
    userId: string,
    login: string
}

export class PostViewDto {

    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: Date
    extendedLikesInfo: {
        likesCount: number
        dislikesCount: number
        myStatus: LikeStatus
        newestLikes: LikeInfo[]

    }

    static mapToView(post: PostDocument, myStatus?: LikeStatus, latestLikes?: Array<LikePostDocument>): PostViewDto {
        const dto = new PostViewDto();
        dto.id = post._id.toString()
        dto.blogId = post.blogId
        dto.blogName = post.blogName
        dto.title = post.title
        dto.shortDescription = post.shortDescription
        dto.content = post.content
        dto.createdAt = post.createdAt
        dto.extendedLikesInfo = {
            likesCount: post.likesCount,
            dislikesCount: post.dislikesCount,
            myStatus: myStatus || LikeStatus.None,
            newestLikes: latestLikes?.map((l): LikeInfo => ({
                addedAt: l.createdAt,
                userId: l.userId,
                login: l.login
            })) || []
        }

        return dto;
    }
}