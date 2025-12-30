import {CommentDocument} from "../../domain/comment.entity";
import {LikeStatus} from "../../../../../core/dto/like.status";

export class CommentViewDto {
    id: string
    content: string
    commentatorInfo: {
        userId: string
        userLogin: string
    }
    createdAt: Date
    likesInfo: {
        likesCount: number
        dislikesCount: number
        myStatus: string
    }

    static mapToView(comment: CommentDocument, myStatus: LikeStatus = LikeStatus.None) {
        const mappedComment = new CommentViewDto()
        mappedComment.id = comment._id.toString()
        mappedComment.content = comment.content
        mappedComment.createdAt = comment.createdAt
        mappedComment.commentatorInfo = {
            userId: comment.userId,
            userLogin: comment.userLogin
        }

        mappedComment.likesInfo = {
            likesCount: comment.likesCount,
            dislikesCount: comment.dislikesCount,
            myStatus: myStatus
        }
        return mappedComment
    }

}