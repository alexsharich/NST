import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdatePostLikeStatusCommand} from "./update-post-like-status.command";
import {InjectModel} from "@nestjs/mongoose";
import {CommentModelType} from "../../../../comments/domain/comment.entity";
import {CommentsRepository} from "../../../../comments/infrastructure/comments.repository";

@CommandHandler(UpdatePostLikeStatusCommand)
export class UpdatePostLikeStatusCommandHandler implements ICommandHandler<UpdatePostLikeStatusCommand, void> {
    constructor(@InjectModel(Comment.name) private readonly CommentModel: CommentModelType,
                private readonly commentsRepository: CommentsRepository) {

    }


    async execute({likeStatus, postId}: UpdatePostLikeStatusCommand) {
        //TODO
    }

}