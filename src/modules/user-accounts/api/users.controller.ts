import {Body, Controller, Query, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "../application/users.service";
import {CreateUserInputDto} from "./input-dto/users.input-dto";
import {UsersQueryRepository} from "../infrastructure/query/users.query-repository";
import {GetUsersQueryParams} from "./input-dto/get-users-query-params.input-dto";
import {BasicGuard} from "../../../core/guards/basic.guard";
import {UsersQueryRawRepository} from "../infrastructure/query/users.query.raw-repository";
import {UsersRawRepository} from "../infrastructure/user.raw.repository";

@UseGuards(BasicGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService,
                private readonly usersQueryRepository: UsersQueryRepository,
                private readonly usersQueryRawRepository: UsersQueryRawRepository,
                private readonly usersRawRepository: UsersRawRepository,

    ) {
    }

    @Post()
    async createUser(@Body() createUserInputDto: CreateUserInputDto) {
        const userId = await this.userService.createUser(createUserInputDto)
        //return this.usersQueryRepository.getByIdOrNotFoundFail(userId)
        return this.usersQueryRawRepository.getByIdOrNotFoundFailSQL(userId)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        //await this.userService.deleteUser(id)
        await this.userService.deleteUser(id)
    }

    @Get()
    async getAll(@Query() queries: GetUsersQueryParams) {
        //return await this.usersQueryRepository.getAll(queries)
        return await this.usersQueryRawRepository.getAllSQL(queries)
    }
}