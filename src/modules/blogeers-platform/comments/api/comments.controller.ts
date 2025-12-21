import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {GetCommentByIdQuery} from "../application/queries/get-comment-by-id/get-comment-by-id.query";
import {UpdateCommentCommand} from '../application/use-cases/update-comment/update-comment-command';


@Controller('comments')
export class CommentsController {
    constructor(private readonly queryBus: QueryBus,
                private readonly commandBus: CommandBus) {
    }

    @HttpCode(HttpStatus.OK)
    @Get('')
    async getComments() {
    }

//TODO 403 проверить на редактирование
    @Put(':commentId')
    async UpdateComment(@Body('content') content: string, @Param('commentId') commentId: string) {
        return this.commandBus.execute(new UpdateCommentCommand(commentId, content))
    }

    @Get(':id')
    async GetCommetnById(@Param('id') id: string) {
        return this.queryBus.execute(new GetCommentByIdQuery(id))
    }

}