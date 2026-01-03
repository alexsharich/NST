import {DeleteCommentCommand} from "./delete-comment-command";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Comment, CommentModelType} from "../../../domain/comment.entity";
import {InjectModel} from "@nestjs/mongoose";
import {DomainException} from "../../../../../../core/exceptions/domain-exceptions";
import {DomainExceptionCode} from "../../../../../../core/exceptions/domain-exceptions-codes";
import {CommentsRepository} from "../../../infrastructure/comments.repository";

@CommandHandler(DeleteCommentCommand)
export class DeleteCommentCommandHandler implements ICommandHandler<DeleteCommentCommand, void> {
    constructor(@InjectModel(Comment.name) private readonly commentModel: CommentModelType,
                private readonly commentsRepository: CommentsRepository) {

    }


    async execute({id, userId}: DeleteCommentCommand) {
        const comment = await this.commentModel.findOne({_id: id, deletedAt: null})

        if (!comment) {
            throw new DomainException({
                code: DomainExceptionCode.NotFound,
                message: "Comment not found"
            })
        }
        if (comment.userId !== userId) {
            throw new DomainException({
                code: DomainExceptionCode.Forbidden,
                message: 'Forbidden'
            })
        }
        comment.makeDeleted()

        await this.commentsRepository.save(comment)
    }
}
