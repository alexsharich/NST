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

    @Prop({type: Boolean, default: false})
    isMembership: boolean


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
        this.deletedAt = new Date();
    }

    update({name, websiteUrl, description}: UpdateBlogInputDto) {
        this.name = name
        this.description = description
        this.websiteUrl = websiteUrl
    }
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

BlogSchema.loadClass(Blog);

export type BlogDocument = HydratedDocument<Blog>;

export type BlogModelType = Model<BlogDocument> & typeof Blog;