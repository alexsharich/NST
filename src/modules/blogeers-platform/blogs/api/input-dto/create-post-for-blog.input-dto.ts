import {IsStringWithTrim} from "../../../../../core/decorators/validation/is-string-with-string";
import {
    contentConstraints,
    shortDescriptionConstraints,
    titleConstraints
} from "../../../posts/domain/dto/create-post.domain.dto";

export class CreatePostForSelectedBlogInputDto {
    @IsStringWithTrim(titleConstraints.minLength, titleConstraints.maxLength)
    title: string;
    @IsStringWithTrim(shortDescriptionConstraints.minLength, shortDescriptionConstraints.maxLength)
    shortDescription: string;
    @IsStringWithTrim(contentConstraints.minLength, contentConstraints.maxLength)
    content: string;
}