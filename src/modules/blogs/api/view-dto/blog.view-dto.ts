import {BlogDocument} from "../../domain/blog.entity";

export class BlogViewDto {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: Date
    isMembership: true

    static mapToView(user: BlogDocument): BlogViewDto {
        const dto = new BlogViewDto();


        return dto;
    }
}