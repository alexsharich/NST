import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Post, PostDocument, PostModelType} from "../domain/post.entity";

@Injectable()
export class PostsRepository {
    constructor(@InjectModel(Post.name) private readonly postModel: PostModelType) {

    }

    async save(post: PostDocument) {
        await post.save()
        return post._id.toString()
    }

    async findOne(id: string) {
        /*
        SELECT * FROM posts WHERE id = id AND deletedAt NOT NULL
        * */
        return this.postModel.findOne({_id: id, deletedAt: null})
    }
}