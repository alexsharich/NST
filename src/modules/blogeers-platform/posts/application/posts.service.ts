import {Injectable, NotFoundException} from '@nestjs/common';
import {CreatePostInputDto} from "../api/input-dto/posts.input-dto";
import {UpdatePostInputDto} from "../api/input-dto/update-post.input-dto";
import {InjectModel} from "@nestjs/mongoose";
import {Post, PostModelType} from "../domain/post.entity";
import {PostsRepository} from "../infrastructure/posts.repository";
import {BlogsRepository} from "../../blogs/infrastructure/blogs.repository";
import {PostsQueryRepository} from "../infrastructure/query/posts-query-repository";

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private readonly postModel: PostModelType,
                private readonly postsQueryRepository: PostsQueryRepository,
                private readonly blogsRepository: BlogsRepository,
                private readonly postsRepository: PostsRepository) {
    }

    async createPost({title, shortDescription, content, blogId}: CreatePostInputDto) {

        const blog = await this.blogsRepository.findOne(blogId)
        if (!blog) {
            throw new NotFoundException('Blog not found')
        }
        const post = this.postModel.createInstance({
            title,
            shortDescription,
            content,
            blogId,
            blogName: blog.name
        })
        const postId = await this.postsRepository.save(post)
        return this.postsQueryRepository.getByIdOrNotFoundFail(postId)
    }

    async deletePost(id: string) {
        const post = await this.postsRepository.findOne(id)
        if (!post) {
            throw new NotFoundException('Post not found')
        }
        /*
        DELETE FROM posts WHERE id = id
        * */
        post.makeDeleted()
        await this.postsRepository.save(post)
    }

    async updatePost(id: string, updatePostInputDto: UpdatePostInputDto) {
        const post = await this.postsRepository.findOne(id)
        if (!post) {
            throw new NotFoundException('Post not found')
        }
        post.update(updatePostInputDto)
        await this.postsRepository.save(post)
    }

}