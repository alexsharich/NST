import {User, UserModelType} from '../../domain/user.entity';
import {InjectModel} from '@nestjs/mongoose';
import {UserViewDto} from '../../api/view-dto/users.view-dto';
import {Injectable} from '@nestjs/common';
import {GetUsersQueryParams} from "../../api/input-dto/get-users-query-params.input-dto";
import {PaginatedViewDto} from "../../../../core/dto/base.paginated.view-dto";
import {FilterQuery} from "mongoose";
import {DomainException} from "../../../../core/exceptions/domain-exceptions";
import {DomainExceptionCode} from "../../../../core/exceptions/domain-exceptions-codes";

@Injectable()
export class UsersQueryRepository {
    constructor(
        @InjectModel(User.name)
        private userModel: UserModelType,
    ) {
    }

    async getByIdOrNotFoundFail(id: string): Promise<UserViewDto> {
        const user = await this.userModel.findOne({_id: id, deletedAt: null})
        if (!user) {
            throw new DomainException({code: DomainExceptionCode.NotFound, message: 'User not found'})
        }
        return UserViewDto.mapToView(user)
    }


    async getAll(queries: GetUsersQueryParams) {
        const filter: FilterQuery<User> = {
            deletedAt: null,
        };
        if (queries.searchLoginTerm) {
            filter.$or = filter.$or || [];
            filter.$or.push({
                login: {$regex: queries.searchLoginTerm, $options: 'i'},
            });
        }

        if (queries.searchEmailTerm) {
            filter.$or = filter.$or || [];
            filter.$or.push({
                email: {$regex: queries.searchEmailTerm, $options: 'i'},
            });
        }

        const users = await this.userModel
            .find(filter)
            .sort({[queries.sortBy]: queries.sortDirection})
            .skip(queries.calculateSkip())
            .limit(queries.pageSize);

        const totalCount = await this.userModel.countDocuments(filter);

        const items = users.map(UserViewDto.mapToView);
        return PaginatedViewDto.mapToView({
            items,
            totalCount,
            page: queries.pageNumber,
            size: queries.pageSize,
        });
    }
}