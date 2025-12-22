import {Injectable} from '@nestjs/common';
import {LikeCommentDocument} from "../domain/like-comment.entity";

@Injectable()
export class LikesRepository {
    constructor() {

    }

    async save(likeComment: LikeCommentDocument) {
        await likeComment.save()
        return likeComment._id
    }


}