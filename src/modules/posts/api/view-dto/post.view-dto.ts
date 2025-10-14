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
        likesCount: 0
        dislikesCount: 0
        myStatus: "None"
        newestLikes: [
            {
                addedAt: string
                userId: string
                login: string
            }
        ]

    }

    static mapToView(user: PostDocument): PostViewDto {
        const dto = new PostViewDto();


        return dto;
    }
}