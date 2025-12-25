import {LikeStatus} from "../../../domain/comment.entity";
import {UserDocument} from "../../../../../user-accounts/domain/user.entity";

export class ChangeLikeCommentStatusCommand {
    constructor(public commentId: string, public likeStatus: LikeStatus, public user: UserDocument) {

    }
}