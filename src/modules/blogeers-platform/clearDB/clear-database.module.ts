import {Module} from '@nestjs/common';
import {ClearDBController} from "./clear-db.controller";
import {Post, PostSchema} from "../posts/domain/post.entity";
import {Blog, BlogSchema} from "../blogs/domain/blog.entity";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../../user-accounts/domain/user.entity";


@Module({
    imports: [MongooseModule.forFeature([
        {name: Blog.name, schema: BlogSchema},
        {name: User.name, schema: UserSchema},
        {name: Post.name, schema: PostSchema}
    ])],
    providers: [],
    controllers: [ClearDBController]
})
export class ClearDBModule {
}