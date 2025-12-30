export class CreatePostDomainDto {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string
}

export const titleConstraints = {
    minLength: 0,
    maxLength: 30
}
export const shortDescriptionConstraints = {
    minLength: 0,
    maxLength: 30
}
export const contentConstraints = {
    minLength: 0,
    maxLength: 1000
}
export const commentContentConstraints = {
    minLength: 20,
    maxLength: 300
}
