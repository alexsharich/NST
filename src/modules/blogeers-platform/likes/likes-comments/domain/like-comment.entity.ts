import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, Model} from 'mongoose';
import {UserDocument} from "../../../../user-accounts/domain/user.entity";
import {LikeStatus} from "../../../../../core/dto/like.status";


@Schema({timestamps: true})
export class LikeComment {
    @Prop({type: String, required: true})
    userId: string;
    @Prop({type: String, enum: LikeStatus, required: true})
    myStatus: LikeStatus;
    @Prop({type: String, required: true})
    commentId: string;


    static createLike(likeStatus: LikeStatus, commentId: string, user: UserDocument,) {
        const like = new this()
        like.userId = String(user._id)
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