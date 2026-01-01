import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateCommentCommand} from "./create-comment.command";
import {InjectModel} from "@nestjs/mongoose";
import {CommentModelType, Comment} from "../../../domain/comment.entity";
import {CommentsRepository} from "../../../infrastructure/comments.repository";
import {NotFoundException} from "@nestjs/common";
import {PostsRepository} from "../../../../posts/infrastructure/posts.repository";

@CommandHandler(CreateCommentCommand)
export class CreateCommandHandler implements ICommandHandler<CreateCommentCommand, string> {
    constructor(@InjectModel(Comment.name) private readonly CommentModel: CommentModelType,
                private readonly postsRepository: PostsRepository,
                private readonly commentsRepository: CommentsRepository) {

    }

    async execute({userLogin, userId, postId, content}: CreateCommentCommand) {
        const post = await this.postsRepository.findOne(postId) // TODO ????
        if (!post) {
            throw new NotFoundException('Post not found')
        }
        const comment = this.CommentModel.createComment({userLogin, userId, postId, content})
        return this.commentsRepository.save(comment)
    }
}