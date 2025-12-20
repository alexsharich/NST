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
    maxLength: 100,
    match: /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/,
}
