/*
import {Injectable} from "@nestjs/common";
import {PostsRepository} from "./posts.repository";
import {BlogsRepository} from "../blogs/blogs.repository";

@Injectable()
export class PostsService {
    constructor(protected postsRepository: PostsRepository, protected blogsRepository:BlogsRepository) {
    }
createPost(inputModel){
   /!* const existBlog = this.blogsRepository.findBlog(inputModel.blogId)
    if (existBlog) {
        const newPost = new PostModel({...body, blogName: existBlog.name})
        return this.postsRepository.save(newPost)
    } else {
        return null
    }*!/
}
    changeLikeStatus(){
       /!* if (!userLikeStatus) {
            const user = await UserModel.findById(userId).exec()
            if (!user) {
                return false
            }
            const newLike = new LikePostModel({
                postId,
                userId,
                myStatus: newStatus,
                login: user.accountData.userName
            })
            await newLike.save()
        } else {
            if (userLikeStatus.myStatus !== newStatus) {
                userLikeStatus.myStatus = newStatus
                await userLikeStatus.save()
            }
        }
        await this.postsRepository.save(post)
        return true*!/
    }
    updatePost({params, body}: any){
        return  this.postsRepository.updatePost({params, body})
    }
}*/
