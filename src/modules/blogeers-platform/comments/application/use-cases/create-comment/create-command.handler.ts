import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateCommentCommand} from "./create-comment.command";
import {InjectModel} from "@nestjs/mongoose";
import {CommentModelType, Comment} from "../../../domain/comment.entity";
import {CommentsRepository} from "../../../infrastructure/comments.repository";

@CommandHandler(CreateCommentCommand)
export class CreateCommandHandler implements ICommandHandler<CreateCommentCommand, string> {
    constructor(@InjectModel(Comment.name) private readonly CommentModel: CommentModelType,
                private readonly commentsRepository: CommentsRepository) {

    }

    async execute({userLogin, userId, postId, content}: CreateCommentCommand) {
        const comment = this.CommentModel.createComment({userLogin, userId, postId, content})
        return this.commentsRepository.save(comment)
    }
}