import {Injectable} from '@nestjs/common';
import {LikePostDocument} from "../domain/like-post.entity";

@Injectable()
export class LikesPostRepository {
    constructor() {

    }

    async save(likePost: LikePostDocument) {
        await likePost.save()
        return likePost._id.toString()
    }

}