import {UserDocument} from "../../../../../user-accounts/domain/user.entity";
import {LikeStatus} from "../../../../../../core/dto/like.status";

export class ChangeLikePostStatusCommand {
    constructor(public postId: string, public likeStatus: LikeStatus, public user: UserDocument) {

    }
}