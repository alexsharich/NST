/*
import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query} from "@nestjs/common";
import {UsersService} from "./users.service";
import {UsersRepository} from "./users.repository";

@Controller('users')
export class UsersController {
    constructor(protected usersService: UsersService, protected usersRepository: UsersRepository) {
    }

    @HttpCode(200)
    @Get()
    getUser(@Param('id') userId: string, @Query('term') term: PaginationQueriesUsersType) {
        const sortFilter = paginationQueriesForUsers(term)

        const users = this.usersRepository.getUsers(sortFilter)
        if (users) {
            return users
        }
    }

    @Post()
    createUser(@Body() inputModel: InputUserType) {
        const isNewUserCreated = this.usersService.createUser(inputModel)

        if (Array.isArray(isNewUserCreated)) {
            /!*  res.status(400).json({
                  errorsMessages: isNewUserCreated
              })*!/
            return
        }


        const newUser = this.usersRepository.findUser(isNewUserCreated as string)
        if (newUser) {
            //res.status(201).json(newUser)
            return
        }
        //res.sendStatus(404)
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        const isDeleted = this.usersService.deleteUser(id)
        if (!isDeleted) {
            //res.sendStatus(404)
            return
        }
        // res.sendStatus(204)
    }
}

export type PaginationQueriesUsersType = {
    pageNumber: number;
    pageSize: number;
    sortBy: string;
    sortDirection: SortType;
    searchLoginTerm: string | null;
    searchEmailTerm: string | null;
}
export type InputUserType = {
    login: string,
    password: string,
    email: string
}
export type OutputUserType = {
    id: string,
    login: string,
    email: string,
    createdAt: Date
}

const paginationQueriesForUsers = (query: PaginationQueriesUsersType) => {
    const pageNumber = query.pageNumber ? +query.pageNumber : 1
    const pageSize = query.pageSize ? +query.pageSize : 10
    const sortBy = query.sortBy ? query.sortBy.toString() : 'createdAt'
    const sortDirection: SortType = query.sortDirection && query.sortDirection === 'asc' ? 'asc' : 'desc'
    const searchLoginTerm = query.searchLoginTerm ? query.searchLoginTerm.toString() : null
    const searchEmailTerm = query.searchEmailTerm ? query.searchEmailTerm.toString() : null

    return {pageNumber, pageSize, sortBy, sortDirection, searchLoginTerm, searchEmailTerm}
}

type SortType = 'desc' | 'asc'

*/
