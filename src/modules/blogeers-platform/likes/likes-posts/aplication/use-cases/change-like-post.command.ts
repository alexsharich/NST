import {UserDocument} from "../../../../../user-accounts/domain/user.entity";
import {LikeStatus} from "../../../../comments/domain/comment.entity";

export class ChangeLikePostStatusCommand {
    constructor(public postId: string, public likeStatus: LikeStatus, public user: UserDocument) {

    }
}