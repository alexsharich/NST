import {Injectable} from '@nestjs/common';
import {CommentDocument} from "../domain/comment.entity";

@Injectable()
export class CommentsRepository {
    constructor() {

    }

    async save(comment: CommentDocument) {
        await comment.save()
        return comment._id.toString()
    }

}