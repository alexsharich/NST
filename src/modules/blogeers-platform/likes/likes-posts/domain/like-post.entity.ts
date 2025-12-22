import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, Model} from 'mongoose';


enum LikeStatus {
    'None',
    'Like',
    'Dislike'
}

@Schema({timestamps: true})
export class LikePost {
    @Prop({type: String, required: true})
    userId: string;
    @Prop({type: LikeStatus, required: true})
    myStatus: 'None';
    @Prop({type: String, required: true})
    postId: string;


    changeStatus(){

    }
}

export const LikePostSchema = SchemaFactory.createForClass(LikePost);

LikePostSchema.loadClass(LikePost);

export type LikePostDocument = HydratedDocument<LikePost>;

export type LikePostModelType = Model<LikePostDocument> & typeof LikePost;