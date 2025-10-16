import {Controller, Delete, HttpCode, HttpStatus,} from '@nestjs/common';

import {InjectModel} from "@nestjs/mongoose";
import {Blog, BlogModelType} from "../blogs/domain/blog.entity";
import {Post, PostModelType} from "../posts/domain/post.entity";
import {User, UserModelType} from "../../user-accounts/domain/user.entity";


@Controller('testing/all-data')
export class ClearDBController {
    constructor(
        @InjectModel(Blog.name) private readonly BlogModel: BlogModelType,
        @InjectModel(Post.name) private readonly PostModel: PostModelType,
        @InjectModel(User.name) private readonly UserModel: UserModelType,) {
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete()
    async clearDataBase() {
        await this.BlogModel.deleteMany({})
        await this.PostModel.deleteMany({})
        await this.UserModel.deleteMany({})
    }
}


