/*
import {Injectable} from "@nestjs/common";
import {BlogsRepository} from "./blogs.repository";

@Injectable()
export class BlogsService {
    constructor(protected blogsRepository: BlogsRepository, protected postsRepository: PostsRepository) {
    }

    createBlog(inputmodel) {
        const newBlog = {//TODO
            name: name,
            description: inputmodel.description,
            websiteUrl: inputmodel.websiteUrl,
            isMembership: false,
            createdAt: (new Date().toISOString())
        }
        return this.blogsRepository.createBlog(newBlog)
    }

    getBlog() {

    }

    deleteBlog(id: string) {
        return this.blogsRepository.deleteBlog(id)
    }

    updateBlog({params, body}: any) { //TODO
        return this.blogsRepository.updateBlog({params, body})
    }

    createPostForSelectedBlog({blogId, body}: { blogId: string, body: InputPostForBlogType }) {
        const existBlog = this.blogsRepository.findBlog(blogId)
        if (existBlog) {
            const newPost: PostType = {
                title: body.title,
                shortDescription: body.shortDescription,
                content: body.content,
                blogId: blogId,
                blogName: existBlog.name,
                createdAt: (new Date().toISOString()), //existBlog.createdAt
            }
            return this.postsRepository.createPost(newPost)
        } else {
            return null
        }
    }

}

export type InputPostForBlogType = {
    title: string,
    shortDescription: string,
    content: string,
}

type PostType = {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    createdAt: string;
}
export type BlogType = {
    name: string,
    description: string,
    websiteUrl: string,
    isMembership: boolean,
    createdAt: string
}*/
