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

    /* async findOne(id: string) {
         return this.comentModel.findOne({_id: id, deletedAt: null})
     }*/

}