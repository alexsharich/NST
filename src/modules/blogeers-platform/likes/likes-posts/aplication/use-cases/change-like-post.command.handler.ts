import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {ChangeLikePostStatusCommand} from "./change-like-post.command";
import {InjectModel} from "@nestjs/mongoose";
import {LikePost, LikePostModelType} from "../../domain/like-post.entity";
import {PostsRepository} from "../../../../posts/infrastructure/posts.repository";
import {DomainException} from "../../../../../../core/exceptions/domain-exceptions";
import {DomainExceptionCode} from "../../../../../../core/exceptions/domain-exceptions-codes";
import {LikesPostRepository} from "../../infrastructure/like-post.repository";
import {PostModelType, Post} from "../../../../posts/domain/post.entity";

@CommandHandler(ChangeLikePostStatusCommand)
export class ChangeLikePostCommandHandler implements ICommandHandler<ChangeLikePostStatusCommand, void> {
    constructor(@InjectModel(LikePost.name) private readonly likePostModel: LikePostModelType,
                @InjectModel(Post.name) private readonly postModel: PostModelType,
                private readonly postsRepository: PostsRepository,
                private readonly likesPostRepository: LikesPostRepository
    ) {

    }


    async execute({likeStatus, postId, user}: ChangeLikePostStatusCommand) {
        const post = await this.postModel.findById({_id: postId, deletedAt: null})
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
        const userId = String(user._id)
        const isLikePostExist = await this.likePostModel.findOne({postId, userId})

        if (!isLikePostExist) {
            const newLikePost = this.likePostModel.createLikePost(user, likeStatus, postId)
            post.updateCounter(likeStatus)
            await Promise.all([this.likesPostRepository.save(newLikePost), this.postsRepository.save(post)])
            return
        }
        post.updateCounter(likeStatus, isLikePostExist.myStatus)
        isLikePostExist.updateStatus(likeStatus)
        await Promise.all([this.likesPostRepository.save(isLikePostExist), this.postsRepository.save(post)])
    }
}