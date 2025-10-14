import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, Model} from 'mongoose';
import {UpdateBlogInputDto} from "../api/input-dto/update-blog.input-dto";
import {CreateBlogDomainDto} from "./dto/create-blog.domain.dto";


@Schema({timestamps: true})
export class Blog {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    description: string;


    @Prop({type: String, min: 5, required: true})
    websiteUrl: string;


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

    static createInstance(dto: CreateBlogDomainDto): BlogDocument {
        const blog = new this();
        blog.description = dto.description
        blog.name = dto.name
        blog.websiteUrl = dto.websiteUrl

        return blog as BlogDocument;
    }


    makeDeleted() {
        if (this.deletedAt !== null) {
            throw new Error('Entity already deleted');
        }
        this.deletedAt = new Date();
    }


    update(dto: UpdateBlogInputDto) {

    }
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

BlogSchema.loadClass(Blog);

export type BlogDocument = HydratedDocument<Blog>;

export type BlogModelType = Model<BlogDocument> & typeof Blog;