import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, Model} from 'mongoose';
import {UpdatePostInputDto} from "../api/input-dto/update-post.input-dto";
import {CreatePostDomainDto} from "./dto/create-post.domain.dto";
import {LikeStatus} from "../../../../core/dto/like.status";


@Schema({timestamps: true})
export class Post {
    @Prop({type: String, required: true})
    title: string;

    @Prop({type: String, required: true})
    shortDescription: string;


    @Prop({type: String, min: 5, required: true})
    content: string;

    @Prop({type: String, min: 5, required: true})
    blogId: string;

    @Prop({type: String, min: 5, required: true})
    blogName: string;

    @Prop({type: Number, default: 0})
    likesCount: number;
    @Prop({type: Number, default: 0})
    dislikesCount: number;


    /*  @Prop({ type: Boolean, required: true, default: false })
      isEmailConfirmed: boolean;*/

    createdAt: Date;
    updatedAt: Date;


    @Prop({type: Date, nullable: true})
    deletedAt: Date | null;


    get id() {
        // @ts-ignore
        return this._id.toString();
    }

    static createInstance(dto: CreatePostDomainDto): PostDocument {
        const post = new this();
        post.content = dto.content
        post.shortDescription = dto.shortDescription
        post.title = dto.title
        post.blogId = dto.blogId
        post.blogName = dto.blogName

        return post as PostDocument;
    }


    makeDeleted() {
        this.deletedAt = new Date();
    }


    update({content, shortDescription, title, blogId}: UpdatePostInputDto) {
        this.blogId = blogId
        this.shortDescription = shortDescription
        this.title = title
        this.content = content
    }

    updateCounter(likeStatus: LikeStatus, myStatus: LikeStatus = LikeStatus.None) {
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
                    this.likesCount > 0 && this.likesCount--
                    this.dislikesCount++
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

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.loadClass(Post);

export type PostDocument = HydratedDocument<Post>;

export type PostModelType = Model<PostDocument> & typeof Post;