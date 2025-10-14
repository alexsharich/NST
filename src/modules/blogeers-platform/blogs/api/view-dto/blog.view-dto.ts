import {BlogDocument} from "../../domain/blog.entity";

export class BlogViewDto {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: Date
    isMembership: boolean

    static mapToView(blog: BlogDocument): BlogViewDto {
        const dto = new BlogViewDto();
        dto.name = blog.name
        dto.websiteUrl = blog.websiteUrl
        dto.createdAt = blog.createdAt
        dto.description = blog.description
        dto.isMembership = blog.isMembership
        dto.id = blog._id.toString()

        return dto;
    }
}