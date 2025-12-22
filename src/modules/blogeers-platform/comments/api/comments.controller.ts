import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {GetCommentByIdQuery} from "../application/queries/get-comment-by-id/get-comment-by-id.query";
import {UpdateCommentCommand} from '../application/use-cases/update-comment/update-comment-command';
import {DeleteCommentCommand} from "../application/use-cases/delete-comment/delete-comment-command";
import {ChangeLikeCommentStatusCommand} from "../application/use-cases/change-like-status/change-like-status.command";
import {LikeStatusType} from "../domain/comment.entity";
import {Request} from "express";
import {AuthGuard} from "../../../../core/guards/auth.guard";


@Controller('comments')
export class CommentsController {
    constructor(private readonly queryBus: QueryBus,
                private readonly commandBus: CommandBus) {
    }

    @UseGuards(AuthGuard)
    @Put(':commentId')
    async updateComment(@Body('content') content: string, @Param('commentId') commentId: string, @Req() req: Request) {
        const userId = req.userId!
        return this.commandBus.execute(new UpdateCommentCommand(commentId, content, userId))
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard)
    @Put(':commentId/like-status')
    async changeLikeCommentStatus(@Body('likeStatus') likeStatus: LikeStatusType, @Param('commentId') commentId: string, @Req() req: Request) {
        const userId = req.userId!
        return this.commandBus.execute(new ChangeLikeCommentStatusCommand(commentId, likeStatus, userId))
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':commentId')
    async deleteComment(@Param('commentId') commentId: string, @Req() req: Request) {
        const userId = req.userId!
        return this.commandBus.execute(new DeleteCommentCommand(commentId, userId))
    }

    @Get(':id')
    async getCommentById(@Param('id') id: string) {
        return this.queryBus.execute(new GetCommentByIdQuery(id))
    }

}

