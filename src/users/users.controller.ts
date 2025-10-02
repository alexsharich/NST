import {Body, Controller, Delete, Get, Param, Post, Put, Query} from "@nestjs/common";
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {
    constructor(protected usersService: UsersService) {
    }

    @Get()
    getUsers(@Query('term') term: string) {
        return this.usersService.findUsers(term)
    }

    @Get(':id')
    getUser(@Param('id') userId: string) {
        return [{id: 1, name: 'Alex'}, {id: 2, name: 'Viktor'}].find(e => e.id === +userId)
    }

    @Post()
    createUser(@Body() inputModel: CreateUserInputModelType) {
        return {id: 12, name: inputModel.name, childrenCount: inputModel.childrenCount}
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() model: CreateUserInputModelType) {
        return {
            id,
            model
        }
    }
}

type CreateUserInputModelType = {
    name: string
    childrenCount: number
}
