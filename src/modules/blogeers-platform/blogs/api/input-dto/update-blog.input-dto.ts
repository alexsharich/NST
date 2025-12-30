import {IsStringWithTrim} from "../../../../../core/decorators/validation/is-string-with-string";
import {descriptionConstraints, nameConstraints, websiteUrlConstraints} from "../../domain/dto/create-blog.domain.dto";
import {IsNotEmpty, IsString, Length, Matches} from "class-validator";
import {Trim} from "../../../../../core/decorators/transform/trim";

export class UpdateBlogInputDto {
    @IsNotEmpty()
    @IsString()
    @Trim()
    @Length(nameConstraints.minLength, nameConstraints.maxLength)
    name: string;
    @IsNotEmpty()
    @IsString()
    @Trim()
    @Length(descriptionConstraints.minLength, descriptionConstraints.maxLength)
    description: string;
    @Matches(websiteUrlConstraints.match)
    @IsNotEmpty()
    @IsString()
    @Trim()
    @Length(websiteUrlConstraints.minLength, websiteUrlConstraints.maxLength)
    websiteUrl: string;
}

