import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class CommentsRepository {
    constructor(/*@InjectModel(Comment.name) private readonly commentModel: CommentModelType*/) {

    }

    /*
    async save(comment: CommentDocument) {
        await comment.save()
        return comment._id.toString()
    }

    async findOne(id: string) {
        return this.comentModel.findOne({_id: id, deletedAt: null})
    }
    */
}