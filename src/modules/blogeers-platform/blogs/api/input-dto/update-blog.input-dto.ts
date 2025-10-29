import {IsStringWithTrim} from "../../../../../core/decorators/validation/is-string-with-string";
import {emailConstraints} from "../../../../user-accounts/domain/user.entity";
import {descriptionConstraints, nameConstraints, websiteUrlConstraints} from "../../domain/dto/create-blog.domain.dto";
import {IsEmail, Matches} from "class-validator";

export class UpdateBlogInputDto {
    @IsStringWithTrim(nameConstraints.minLength, nameConstraints.maxLength)
    name: string;
    @IsStringWithTrim(descriptionConstraints.minLength, descriptionConstraints.maxLength)
    description: string;
    @IsEmail()
    @Matches(emailConstraints.match)
    @IsStringWithTrim(websiteUrlConstraints.minLength, websiteUrlConstraints.maxLength)
    websiteUrl: string;
}

