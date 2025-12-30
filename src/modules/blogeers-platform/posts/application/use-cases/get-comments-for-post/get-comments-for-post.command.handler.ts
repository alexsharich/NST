import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {InjectModel} from "@nestjs/mongoose";
import {PostModelType, Post} from "../../../domain/post.entity";

import {GetCommentsForPostQuery} from "./get-comments-for-post.command";
import {PostsQueryRepository} from "../../../infrastructure/query/posts-query-repository";

@QueryHandler(GetCommentsForPostQuery)
export class GetCommentsForPostQueryHandler implements IQueryHandler<GetCommentsForPostQuery, any> {
    constructor(@InjectModel(Post.name) private readonly PostModel: PostModelType,
                private readonly postsQueryRepostory: PostsQueryRepository) {

    }

    async execute({postId, queries, userId}: GetCommentsForPostQuery) {
        return this.postsQueryRepostory.getCommentsForPost(postId, queries, userId)
    }
}