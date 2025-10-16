import {PostDocument} from "../../domain/post.entity";


export class PostViewDto {

    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: Date
    extendedLikesInfo: {
        likesCount: number
        dislikesCount: number
        myStatus: "None"
        newestLikes: []

    }

    static mapToView(post: PostDocument): PostViewDto {
        const dto = new PostViewDto();
        dto.id = post._id.toString()
        dto.blogId = post.blogId
        dto.blogName = post.blogName
        dto.title = post.title
        dto.shortDescription = post.shortDescription
        dto.content = post.content
        dto.createdAt = post.createdAt
        dto.extendedLikesInfo = {
            likesCount: 0,
            dislikesCount: 0,
            myStatus: "None",
            newestLikes: []
        }

        return dto;
    }
}