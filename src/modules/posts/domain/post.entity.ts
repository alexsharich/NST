import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, Model} from 'mongoose';
import {UpdatePostInputDto} from "../api/input-dto/update-post.input-dto";
import {CreatePostDomainDto} from "./dto/create-post.domain.dto";


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

        return post as PostDocument;
    }


    makeDeleted() {
        if (this.deletedAt !== null) {
            throw new Error('Entity already deleted');
        }
        this.deletedAt = new Date();
    }


    update(dto: UpdatePostInputDto) {

    }
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.loadClass(Post);

export type PostDocument = HydratedDocument<Post>;

export type PostModelType = Model<PostDocument> & typeof Post;