import {Injectable, NotFoundException, Post} from '@nestjs/common';
import {CreatePostInputDto} from "../api/input-dto/posts.input-dto";
import {UpdatePostInputDto} from "../api/input-dto/update-post.input-dto";
import {InjectModel} from "@nestjs/mongoose";
import {PostModelType} from "../domain/post.entity";
import {PostsRepository} from "../infrastructure/posts.repository";

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private readonly PostModel: PostModelType, private readonly postsRepository: PostsRepository) {
    }

    async createPost({title, shortDescription, content, blogId}: CreatePostInputDto) {
        const post = this.PostModel.createInstance({title, shortDescription, content, blogId})
        return this.postsRepository.save(post)
    }

    async deletePost(id: string) {
        const post = await this.postsRepository.findOne(id)
        if (!post) {
            throw new NotFoundException('Post not found')
        }
        post.makeDeleted()
        await this.postsRepository.save(post)
    }

    async updatePost(id: string, updatePostInputDto: UpdatePostInputDto) {

    }
}