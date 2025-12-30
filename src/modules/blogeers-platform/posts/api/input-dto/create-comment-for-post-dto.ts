import {IsString} from "class-validator";
import {Trim} from "../../../../../core/decorators/transform/trim";

export class CreateNewCommentInputDto {
    @Trim()
    @IsString()
    content: string
}