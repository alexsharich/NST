import {IsNotEmpty, IsString, Length} from "class-validator";
import {Trim} from "../../../../../core/decorators/transform/trim";
import {commentContentConstraints} from "../../domain/dto/create-post.domain.dto";

export class CreateNewCommentInputDto {
    @IsNotEmpty()
    @IsString()
    @Trim()
    @Length(commentContentConstraints.minLength, commentContentConstraints.maxLength)
    content: string
}