import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, Model} from 'mongoose';
import {LikeStatus} from "../../../../../core/dto/like.status";
import {UserDocument} from "../../../../user-accounts/domain/user.entity";


@Schema({timestamps: true})
export class LikePost {
    @Prop({type: String, required: true})
    userId: string;
    @Prop({type: String, required: true})
    myStatus: LikeStatus;
    @Prop({type: String, required: true})
    postId: string;
    @Prop({type: String, required: true})
    login: string;

    createdAt: Date


    static createLikePost(user: UserDocument, likeStatus: LikeStatus = LikeStatus.None, postId: string) {
        const likePost = new this()
        likePost.postId = postId
        likePost.userId = String(user._id)
        likePost.myStatus = likeStatus
        likePost.login = user.login
        return likePost as LikePostDocument
    }

    updateStatus(myStatus: LikeStatus) {
        this.myStatus = myStatus
    }


}

export const LikePostSchema = SchemaFactory.createForClass(LikePost);

LikePostSchema.loadClass(LikePost);

export type LikePostDocument = HydratedDocument<LikePost>;

export type LikePostModelType = Model<LikePostDocument> & typeof LikePost;