import {User, UserModelType} from '../../domain/user.entity';
import {InjectModel} from '@nestjs/mongoose';
import {UserViewDto} from '../../api/view-dto/users.view-dto';
import {Injectable, NotFoundException} from '@nestjs/common';
import {GetUsersQueryParams} from "../../api/input-dto/get-users-query-params.input-dto";
import {PaginatedViewDto} from "../../../../core/dto/base.paginated.view-dto";
import {FilterQuery} from "mongoose";

@Injectable()
export class UsersQueryRepository {
    constructor(
        @InjectModel(User.name)
        private UserModel: UserModelType,
    ) {
    }

    async getByIdOrNotFoundFail(id: string): Promise<UserViewDto> {
        const user = await this.UserModel.findById(id)
        if (!user) {
            throw new NotFoundException('User not found')//404
        }
        return UserViewDto.mapToView(user)
    }

    async getAll(queries: GetUsersQueryParams) {
        const filter: FilterQuery<User> = {
            deletedAt: null,
        };

        const users = await this.UserModel
            .find(filter)
            .sort({[queries.sortBy]: queries.sortDirection})
            .skip(queries.calculateSkip())
            .limit(queries.pageSize);

        const totalCount = await this.UserModel.countDocuments(filter);

        const items = users.map(UserViewDto.mapToView);
        return PaginatedViewDto.mapToView({
            items,
            totalCount,
            page: queries.pageNumber,
            size: queries.pageSize,
        });
    }
}