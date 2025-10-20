import {IsStringWithTrim} from "../../../../core/decorators/validation/is-string-with-string";
import {passwordConstraints} from "../../domain/user.entity";
import {IsString} from "class-validator";


export class Login {
    @IsString()
    loginOrEmail: string

    @IsStringWithTrim(passwordConstraints.minLength, passwordConstraints.maxLength)
    password: string
}