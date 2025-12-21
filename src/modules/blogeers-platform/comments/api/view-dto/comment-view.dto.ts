import {CommentDocument} from "../../domain/comment.entity";

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

    static mapToView(comment: CommentDocument) {
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
            myStatus: 'None'
        }
        return mappedComment
    }

}