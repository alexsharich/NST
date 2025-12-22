import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {InjectModel} from "@nestjs/mongoose";
import {PostModelType, Post} from "../../../domain/post.entity";

import {GetCommentsForPostQuery} from "./get-comments-for-post.command";

@QueryHandler(GetCommentsForPostQuery)
export class GetCommentsForPostQueryHandler implements IQueryHandler<GetCommentsForPostQuery, void> {
    constructor(@InjectModel(Post.name) private readonly PostModel: PostModelType) {

    }

    async execute({postId, queries}: GetCommentsForPostQuery) {

    }
}