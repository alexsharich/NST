import {IsEmail, Length, Matches} from "class-validator";
import {emailConstraints} from "../../../../user-accounts/domain/user.entity";
import {descriptionConstraints, nameConstraints, websiteUrlConstraints} from "../../domain/dto/create-blog.domain.dto";
import {IsStringWithTrim} from "../../../../../core/decorators/validation/is-string-with-string";

export class CreateBlogInputDto {
    @IsStringWithTrim(nameConstraints.minLength, nameConstraints.maxLength)
    name: string;
    @Length(descriptionConstraints.maxLength)
    description: string;
    @IsEmail()
    @Matches(emailConstraints.match)
    @IsStringWithTrim(websiteUrlConstraints.minLength, websiteUrlConstraints.maxLength)
    websiteUrl: string;
}
