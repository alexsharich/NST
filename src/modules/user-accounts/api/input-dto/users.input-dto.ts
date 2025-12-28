import {IsEmail, IsString} from "class-validator";
import {loginConstraints, passwordConstraints} from "../../domain/user.entity";
import {Trim} from "../../../../core/decorators/transform/trim";
import {IsStringWithTrim} from "../../../../core/decorators/validation/is-string-with-string";

export class CreateUserInputDto {
    @IsStringWithTrim(loginConstraints.minLength, loginConstraints.maxLength)
    login: string;
    @IsStringWithTrim(passwordConstraints.minLength, passwordConstraints.maxLength)
    password: string;
    @IsEmail()
    @IsString()
    @Trim()
    email: string;
}