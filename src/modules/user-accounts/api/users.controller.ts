import {Body, Controller, Query, Delete, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import {UsersService} from "../application/users.service";
import {CreateUserInputDto} from "./input-dto/users.input-dto";
import {UsersQueryRepository} from "../infrastructure/query/users.query-repository";
import {GetUsersQueryParams} from "./input-dto/get-users-query-params.input-dto";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService, private readonly usersQueryRepository: UsersQueryRepository) {
    }

    @Post()
    async createUser(@Body() createUserInputDto: CreateUserInputDto) {
        const userId = await this.userService.createUser(createUserInputDto)
        return this.usersQueryRepository.getByIdOrNotFoundFail(userId)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        await this.userService.deleteUser(id)
    }

    @Get()
    async getAll(@Query() queries: GetUsersQueryParams) {
        return await this.usersQueryRepository.getAll(queries)
    }
}