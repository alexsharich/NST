import {GetCommentByIdQuery} from "./get-comment-by-id.query";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {CommentsQueryRepository} from "../../../infrastructure/query/comments.query-repository";
import {CommentViewDto} from "../../../api/view-dto/comment-view.dto";

@QueryHandler(GetCommentByIdQuery)
export class GetCommentByIdQueryHandler implements IQueryHandler<GetCommentByIdQuery, CommentViewDto> {
    constructor(private readonly commentsQueryRepository: CommentsQueryRepository) {

    }

    async execute({commentId, userId}: GetCommentByIdQuery) {
        return this.commentsQueryRepository.getByIdOrNotFoundFail(commentId, userId)
    }
}
