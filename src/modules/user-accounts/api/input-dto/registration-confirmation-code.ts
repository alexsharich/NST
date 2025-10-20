import {IsString} from "class-validator";
import {Trim} from "../../../../core/decorators/transform/trim";

export class RegistrationConfirmationCode {
    @IsString()
    @Trim()
    code: string
}