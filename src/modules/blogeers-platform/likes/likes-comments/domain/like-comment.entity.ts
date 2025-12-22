import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, Model} from 'mongoose';
import {LikeStatus} from "../../../comments/domain/comment.entity";


@Schema({timestamps: true})
export class LikeComment {
    @Prop({type: String, required: true})
    userId: string;
    @Prop({type: String, required: true})
    myStatus: LikeStatus;
    @Prop({type: String, required: true})
    commentId: string;


    static createLike(likeStatus: LikeStatus, userId: string, commentId: string) {
        const like = new this()
        like.userId = userId
        like.myStatus = likeStatus
        like.commentId = commentId
        return like as LikeCommentDocument

    }

    update(likeStatus: LikeStatus) {
        this.myStatus = likeStatus
    }

}

export const LikeCommentSchema = SchemaFactory.createForClass(LikeComment);

LikeCommentSchema.loadClass(LikeComment);

export type LikeCommentDocument = HydratedDocument<LikeComment>;

export type LikeCommentModelType = Model<LikeCommentDocument> & typeof LikeComment;