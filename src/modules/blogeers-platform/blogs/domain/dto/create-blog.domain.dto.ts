export class CreateBlogDomainDto {
    name: string;
    description: string;
    websiteUrl: string;
}

export const nameConstraints = {
    minLength: 0,
    maxLength: 15,
};
export const descriptionConstraints = {
    minLength: 0,
    maxLength: 500,
};
export const websiteUrlConstraints = {
    minLength: 0,
    maxLength: 100
}
