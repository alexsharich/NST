import {LikeStatus} from "../../../domain/comment.entity";

export class ChangeLikeCommentStatusCommand {
    constructor(public commentId: string, public likeStatus: LikeStatus, public userId: string) {

    }
}