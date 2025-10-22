import {IsEmail, IsString, Matches} from "class-validator";
import {emailConstraints, loginConstraints, passwordConstraints} from "../../domain/user.entity";
import {Trim} from "../../../../core/decorators/transform/trim";
import {IsStringWithTrim} from "../../../../core/decorators/validation/is-string-with-string";

export class CreateUserInputDto {
    @IsStringWithTrim(loginConstraints.minLength, loginConstraints.maxLength)
    login: string;
    @IsStringWithTrim(passwordConstraints.minLength, passwordConstraints.maxLength)
    password: string;
    @IsEmail()
    @IsString()
    @Matches(emailConstraints.match)
    @Trim()
    email: string;
}