import {UserDocument} from "../../../../../user-accounts/domain/user.entity";
import {LikeStatus} from "../../../../../../core/dto/like.status";

export class ChangeLikeCommentStatusCommand {
    constructor(public commentId: string, public likeStatus: LikeStatus, public user: UserDocument) {

    }
}