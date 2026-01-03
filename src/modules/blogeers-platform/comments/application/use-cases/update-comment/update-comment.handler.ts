import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateCommentCommand} from "./update-comment-command";
import {InjectModel} from "@nestjs/mongoose";
import {Comment, CommentModelType} from "../../../domain/comment.entity";
import {CommentsRepository} from "../../../infrastructure/comments.repository";
import {DomainException} from "../../../../../../core/exceptions/domain-exceptions";
import {DomainExceptionCode} from "../../../../../../core/exceptions/domain-exceptions-codes";

@CommandHandler(UpdateCommentCommand)
export class UpdateCommentCommandHandler implements ICommandHandler<UpdateCommentCommand, void> {
    constructor(@InjectModel(Comment.name) private readonly commentModel: CommentModelType,
                private readonly commentsRepository: CommentsRepository,) {

    }

    async execute({id, content, userId}: UpdateCommentCommand) {
        const comment = await this.commentModel.findOne({_id: id, deletedAt: null})
        if (!comment) {
            throw new DomainException({
                code: DomainExceptionCode.NotFound,
                message: 'Comment not found'
            })
        }
        if (comment.userId !== userId) {
            throw new DomainException({
                code: DomainExceptionCode.Forbidden,
                message: 'Forbidden'
            })
        }
        comment.update(content)
        await this.commentsRepository.save(comment)
    }
}