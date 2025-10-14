import {Injectable} from '@nestjs/common';
import {CreatePostInputDto} from "../api/input-dto/posts.input-dto";
import {UpdatePostInputDto} from "../api/input-dto/update-post.input-dto";

@Injectable()
export class PostsService {
    constructor() {
    }

    async createPost({title, shortDescription, content, blogId}: CreatePostInputDto) {

    }

    async deletePost(id: string) {

    }

    async updatePost(id: string, updatePostInputDto: UpdatePostInputDto) {

    }
}