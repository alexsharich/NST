import {IsStringWithTrim} from "../../../../../core/decorators/validation/is-string-with-string";
import {
    contentConstraints,
    shortDescriptionConstraints,
    titleConstraints
} from "../../domain/dto/create-post.domain.dto";
import {IsString} from "class-validator";

export class CreatePostInputDto {
    @IsStringWithTrim(titleConstraints.minLength, titleConstraints.maxLength)
    title: string;
    @IsStringWithTrim(shortDescriptionConstraints.minLength, shortDescriptionConstraints.maxLength)
    shortDescription: string;
    @IsStringWithTrim(contentConstraints.minLength, contentConstraints.maxLength)
    content: string;
    @IsString()
    blogId: string;
}
