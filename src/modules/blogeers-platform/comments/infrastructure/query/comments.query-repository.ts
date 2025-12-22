import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Comment, CommentModelType} from "../../domain/comment.entity";
import {CommentViewDto} from "../../api/view-dto/comment-view.dto";
import {DomainException} from "../../../../../core/exceptions/domain-exceptions";
import {DomainExceptionCode} from "../../../../../core/exceptions/domain-exceptions-codes";


@Injectable()
export class CommentsQueryRepository {
    constructor(@InjectModel(Comment.name) private readonly CommentModel: CommentModelType) {
    }

    async getByIdOrNotFoundFail(id: string): Promise<CommentViewDto> {
        const comment = await this.CommentModel.findOne({_id: id, deletedAt: null})

        if (!comment) {
            throw new DomainException({
                code: DomainExceptionCode.NotFound,
                message: 'Comment not found'
            })
        }
        return CommentViewDto.mapToView(comment)
    }

}