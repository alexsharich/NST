import {IsStringWithTrim} from "../../../../../core/decorators/validation/is-string-with-string";
import {
    contentConstraints,
    shortDescriptionConstraints,
    titleConstraints
} from "../../../posts/domain/dto/create-post.domain.dto";
import {IsNotEmpty, IsString, Length} from "class-validator";
import {Trim} from "../../../../../core/decorators/transform/trim";
import {nameConstraints} from "../../domain/dto/create-blog.domain.dto";

export class CreatePostForSelectedBlogInputDto {
    @IsNotEmpty()
    @IsString()
    @Trim()
    @Length(titleConstraints.minLength, titleConstraints.maxLength)
    title: string;
    @IsNotEmpty()
    @IsString()
    @Trim()
    @Length(shortDescriptionConstraints.minLength, shortDescriptionConstraints.maxLength)
    shortDescription: string;
    @IsNotEmpty()
    @IsString()
    @Trim()
    @Length(contentConstraints.minLength, contentConstraints.maxLength)
    content: string;
}