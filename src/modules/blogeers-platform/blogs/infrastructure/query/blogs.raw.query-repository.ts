import {InjectModel} from '@nestjs/mongoose';
import {Injectable, NotFoundException} from '@nestjs/common';
import {PaginatedViewDto} from "../../../../../core/dto/base.paginated.view-dto";
import {FilterQuery} from "mongoose";
import {Blog, BlogModelType} from "../../domain/blog.entity";
import {BlogViewDto} from "../../api/view-dto/blog.view-dto";
import {GetBlogsQueryParams} from "../../api/input-dto/get-blogs-query-params.input-dto";
import {PgService} from "../../../../../core/libs/pg/pg.service";
import {BlogsRawRepository} from "../blogs.raw.repository";

@Injectable()
export class BlogsQueryRepository {
    constructor(private readonly pgService: PgService,
                private readonly blogsRawRepository: BlogsRawRepository) {
    }

    async getByIdOrNotFoundFailSQL(id: string) {

        const blog = await this.blogsRawRepository.findOneSQL(id)
        if (!blog) {
            throw new NotFoundException('Blog not found')
        }
        // return BlogViewDto.mapToView(blog) TODO
    }

    async getAllSQL(queries: GetBlogsQueryParams) {

        const res = await this.pgService.runQuery<{}>(`
            SELECT *
            FROM blogs
            WHERE deletedAt IS NULL
              AND ("blogName" ILIKE '%' || :searchNameTerm || '%' OR :searchNameTerm IS NULL) -- фильтрация по имени
            ORDER BY CASE
                         WHEN :sortBy = 'blogName' THEN "blogName"
                         WHEN :sortBy = 'createdAt' THEN "createdAt"
                         ELSE "id" -- значение по умолчанию для сортировки
                         END :sortDirection
        LIMIT :pageSize
            OFFSET :calculateSkip
        `, [])

        const filter: FilterQuery<Blog> = {
            deletedAt: null,
        };
        if (queries.searchNameTerm) {
            filter.name = {$regex: queries.searchNameTerm, $options: 'i'}
        }

        /*const blogs = await this.blogModel
            .find(filter)
            .sort({[queries.sortBy]: queries.sortDirection})
            .skip(queries.calculateSkip())
            .limit(queries.pageSize);

        const totalCount = await this.blogModel.countDocuments(filter);

        const items = blogs.map(BlogViewDto.mapToView);
        return PaginatedViewDto.mapToView({
            items,
            totalCount,
            page: queries.pageNumber,
            size: queries.pageSize,
        });*/


    }
}