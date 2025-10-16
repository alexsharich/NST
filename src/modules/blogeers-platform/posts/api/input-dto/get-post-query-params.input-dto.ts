import {BaseQueryParams} from "../../../../../core/dto/base.query-params.input-dto";
import {UsersSortBy} from "../../../../user-accounts/api/input-dto/users-sort-by";

export class GetPostQueryParams extends BaseQueryParams {
    sortBy = UsersSortBy.CreatedAt;
    searchNameTerm: string | null = null;
}