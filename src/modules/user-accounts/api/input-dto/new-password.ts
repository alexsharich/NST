import {IsStringWithTrim} from "../../../../core/decorators/validation/is-string-with-string";
import {passwordConstraints} from "../../domain/user.entity";
import {IsString} from "class-validator";
import {Trim} from "../../../../core/decorators/transform/trim";

export class NewPasswordType {
    @IsStringWithTrim(passwordConstraints.minLength, passwordConstraints.maxLength)
    newPassword: string
    @IsString()
    @Trim()
    recoveryCode: string
}