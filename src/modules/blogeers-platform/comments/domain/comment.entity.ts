import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, Model} from 'mongoose';

export type LikeStatus = 'None' | 'Like' | 'Dislike'

@Schema({timestamps: true})
export class Comment {
    @Prop({type: String, required: true})
    content: string;
    @Prop({type: String, required: true})
    postId: string;
    @Prop({type: String, required: true})
    userId: string;
    @Prop({type: String, required: true})
    userLogin: string;
    @Prop({type: Number, default: 0})
    likesCount: number;
    @Prop({type: Number, default: 0})
    dislikesCount: number;

    createdAt: Date;
    updatedAt: Date;

    @Prop({type: Date, nullable: true})
    deletedAt: Date | null;

    //TODO DTO
    static createComment(dto: any) {
        const comment = new this()
        comment.content = dto.content
        comment.userId = dto.userId
        comment.userLogin = dto.userLogin
        comment.postId = dto.postId
        return comment as CommentDocument
    }

    update(content: string) {
        this.content = content
    }

    makeDeleted() {
        this.deletedAt = new Date()
    }

    updateCounter(likeStatus: LikeStatus, myStatus: LikeStatus = 'None') {
        switch (likeStatus) {
            case "Like": {
                if (myStatus === 'Dislike') {
                    this.dislikesCount > 0 && this.dislikesCount--
                    this.likesCount++
                }
                if (myStatus === 'Like') {
                    return
                }
                if (myStatus === 'None') {
                    this.likesCount++
                }
                break
            }
            case "Dislike": {
                if (myStatus === 'Dislike') {
                    return
                }
                if (myStatus === 'Like') {
                    this.dislikesCount > 0 && this.dislikesCount--
                    this.likesCount++
                }
                if (myStatus === 'None') {
                    this.dislikesCount++
                }
                break
            }
            case "None": {
                if (myStatus === "Like") {
                    this.likesCount > 0 && this.likesCount--

                }
                if (myStatus === "Dislike") {
                    this.dislikesCount > 0 && this.dislikesCount--
                }
                if (myStatus === "None") {
                    return
                }
                break
            }
        }
    }

}


export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.loadClass(Comment);

export type CommentDocument = HydratedDocument<Comment>;

export type CommentModelType = Model<CommentDocument> & typeof Comment;