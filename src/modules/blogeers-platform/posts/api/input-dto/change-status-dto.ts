import {IsEnum, IsString} from "class-validator";
import {LikeStatus} from "../../../../../core/dto/like.status";

export class ChangeStatusDto {
    @IsString()
    @IsEnum(LikeStatus)
    likeStatus: LikeStatus;
}
