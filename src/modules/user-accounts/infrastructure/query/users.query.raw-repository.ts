import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserModelType} from "../../domain/user.entity";
import {UserViewDto} from "../../api/view-dto/users.view-dto";
import {DomainException} from "../../../../core/exceptions/domain-exceptions";
import {DomainExceptionCode} from "../../../../core/exceptions/domain-exceptions-codes";
import {GetUsersQueryParams} from "../../api/input-dto/get-users-query-params.input-dto";
import {PaginatedViewDto} from "../../../../core/dto/base.paginated.view-dto";
import {PgService} from "../../../../core/libs/pg/pg.service";


@Injectable()
export class UsersQueryRawRepository {
    constructor(
        @InjectModel(User.name)
        private userModel: UserModelType,
        private readonly pgService: PgService
    ) {
    }

    async getByIdOrNotFoundFailSQL(id: string): Promise<UserViewDto> {

        const res = await this.pgService.runQuery<any>(`
            SELECT *
            FROM users
            WHERE id = $1
              AND "deletedAt" IS NULL
        `, [id]);

        const user = res?.rows?.[0];


        if (!user) {
            throw new DomainException({
                code: DomainExceptionCode.NotFound,
                message: 'User not found'
            });
        }

        return UserViewDto.mapToView(user);
    }


    async getAllSQL(queries: GetUsersQueryParams) {
        const params: any[] = [];
        const searchConditions: string[] = [];


        if (queries.searchLoginTerm) {
            params.push(`%${queries.searchLoginTerm}%`);
            searchConditions.push(`login ILIKE $${params.length}`);
        }

        if (queries.searchEmailTerm) {
            params.push(`%${queries.searchEmailTerm}%`);
            searchConditions.push(`email ILIKE $${params.length}`);
        }


        let whereClause = `WHERE "deletedAt" IS NULL`;
        if (searchConditions.length > 0) {
            whereClause += ` AND (${searchConditions.join(' OR ')})`;
        }


        const allowedSortByFields = ['id', 'login', 'email', 'createdAt', 'updatedAt'];
        const sortBy = allowedSortByFields.includes(queries.sortBy) ? `"${queries.sortBy}"` : '"createdAt"';
        const sortDirection = queries.sortDirection?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';


        const limit = queries.pageSize;
        const offset = queries.calculateSkip();


        const dataQuery = `
            SELECT *
            FROM users ${whereClause}
            ORDER BY ${sortBy} ${sortDirection}
        LIMIT ${limit}
            OFFSET ${offset}
        `;

        const countQuery = `
            SELECT COUNT(*) ::int as "totalCount"
            FROM users ${whereClause}
        `;

        const [dataRes, countRes] = await Promise.all([
            this.pgService.runQuery<any>(dataQuery, params),
            this.pgService.runQuery<{ totalCount: number }>(countQuery, params)
        ]);

        const users = dataRes?.rows || [];
        const totalCount = countRes?.rows?.[0]?.totalCount || 0;


        const items = users.map(UserViewDto.mapToView);
        return PaginatedViewDto.mapToView({
            items,
            totalCount,
            page: queries.pageNumber,
            size: queries.pageSize,
        })
    }
}