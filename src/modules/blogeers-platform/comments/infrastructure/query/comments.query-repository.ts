import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Comment, CommentModelType} from "../../domain/comment.entity";
import {CommentViewDto} from "../../api/view-dto/comment-view.dto";
import {DomainException} from "../../../../../core/exceptions/domain-exceptions";
import {DomainExceptionCode} from "../../../../../core/exceptions/domain-exceptions-codes";
import {LikeComment, LikeCommentModelType} from "../../../likes/likes-comments/domain/like-comment.entity";


@Injectable()
export class CommentsQueryRepository {
    constructor(@InjectModel(Comment.name) private readonly CommentModel: CommentModelType,
                @InjectModel(LikeComment.name) private readonly LikeComment: LikeCommentModelType) {
    }

    async getByIdOrNotFoundFail(id: string, userId?: string): Promise<CommentViewDto> {
        const comment = await this.CommentModel.findOne({_id: id, deletedAt: null})
        if (!comment) {
            throw new DomainException({
                code: DomainExceptionCode.NotFound,
                message: 'Comment not found'
            })

        }
        const like = await this.LikeComment.findOne({userId, commentId: id})
        const myStatus = like?.myStatus || undefined
        return CommentViewDto.mapToView(comment, myStatus)
    }

}