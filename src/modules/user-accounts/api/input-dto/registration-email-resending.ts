import {IsEmail, IsString} from "class-validator";
import {Trim} from "../../../../core/decorators/transform/trim";

export class RegistrationEmailResending {
    @IsEmail()
    @IsString()
    @Trim()
    email: string
}