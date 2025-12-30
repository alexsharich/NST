import {IsNotEmpty, IsString, Length, Matches} from "class-validator";
import {descriptionConstraints, nameConstraints, websiteUrlConstraints} from "../../domain/dto/create-blog.domain.dto";
import {IsStringWithTrim} from "../../../../../core/decorators/validation/is-string-with-string";
import {Trim} from "../../../../../core/decorators/transform/trim";

export class CreateBlogInputDto {
    @IsNotEmpty()
    @IsString()
    @Trim()
    @Length(nameConstraints.minLength, nameConstraints.maxLength)
    name: string;
    @Length(descriptionConstraints.minLength, descriptionConstraints.maxLength)
    description: string;
    @Matches(websiteUrlConstraints.match)
    @IsStringWithTrim(websiteUrlConstraints.minLength, websiteUrlConstraints.maxLength)
    websiteUrl: string;
}
