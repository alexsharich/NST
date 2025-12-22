import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {ChangeLikeCommentStatusCommand} from "./change-like-status.command";
import {InjectModel} from "@nestjs/mongoose";
import {CommentModelType, Comment} from "../../../domain/comment.entity";
import {CommentsRepository} from "../../../infrastructure/comments.repository";
import {DomainException} from "../../../../../../core/exceptions/domain-exceptions";
import {DomainExceptionCode} from "../../../../../../core/exceptions/domain-exceptions-codes";
import {LikeCommentModelType} from "../../../../likes/likes-comments/domain/like-comment.entity";
import {LikesRepository} from "../../../../likes/likes-comments/infrastructure/like-comment.repository";

@CommandHandler(ChangeLikeCommentStatusCommand)
export class ChangeLikeStatusCommandHandler implements ICommandHandler<ChangeLikeCommentStatusCommand, void> {
    constructor(@InjectModel(Comment.name) private readonly CommentModel: CommentModelType,
                private readonly commentsRepository: CommentsRepository,
                private readonly likeCommentModel: LikeCommentModelType,
                private readonly likeCommentsRepository: LikesRepository) {

    }

    async execute({likeStatus, commentId, userId}: ChangeLikeCommentStatusCommand) {
        const comment = await this.CommentModel.findOne({_id: commentId, deletedAt: null})
        if (!comment) {
            throw new DomainException({
                code: DomainExceptionCode.NotFound,
                message: 'Not Found'
            })
        }
        const isLikeExist = await this.likeCommentModel.findOne({commentId, userId})
        if (!isLikeExist) {
            const newLike = this.likeCommentModel.createLike(likeStatus, commentId, userId)
            await this.likeCommentsRepository.save(newLike)

            //comment.updateCount(!!!)
            //promise.all
            return
        }
        isLikeExist.update(likeStatus)
        //comment.updateCount(!!!)
        //promise.all
        await this.likeCommentsRepository.save(isLikeExist)

    }
}