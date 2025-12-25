/*
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {InjectModel} from "@nestjs/mongoose";
import {PostsRepository} from "../../../../posts/infrastructure/posts.repository";
import {DomainException} from "../../../../../../core/exceptions/domain-exceptions";
import {DomainExceptionCode} from "../../../../../../core/exceptions/domain-exceptions-codes";
import {UpdatePostLikeStatusCommand} from "./update-post-like-status.command";
import {LikePostModelType, LikePost} from "../../../../likes/likes-posts/domain/like-post.entity";

@CommandHandler(UpdatePostLikeStatusCommand)
export class ChangeLikePostCommandHandler implements ICommandHandler<UpdatePostLikeStatusCommand, void> {
    constructor(@InjectModel(LikePost.name) private readonly LikePostModel: LikePostModelType,
                private readonly postsRepository: PostsRepository,
    ) {

    }


    async execute({likeStatus, postId, user}: UpdatePostLikeStatusCommand) {
        const post = await this.LikePostModel.findById({_id: postId, deletedAt: null})
        if (!post) {
            throw new DomainException({
                code: DomainExceptionCode.NotFound,
                message: 'Post not found !'
            })
        }

        if (!user) {
            throw new DomainException({
                code: DomainExceptionCode.NotFound,
                message: 'User not found '
            })
        }
        const userId = user._id
        const isLikePostExist = await this.LikePostModel.findOne({postId, userId})

        if (!isLikePostExist) {
            const newLikePost = await this.LikePostModel.createLikePost(userId, likeStatus, postId)
        }

    }
}*/
