import {UserDocument} from '../../domain/user.entity';
import {UserViewDto} from "./users.view-dto";

export class UserMeViewDto {
    userId: string;
    login: string;
    email: string;

    static mapToView(user: UserViewDto): UserMeViewDto {
        const dto = new UserMeViewDto();

        dto.email = user.email;
        dto.login = user.login;
        dto.userId = user.id;
        return dto;
    }
}