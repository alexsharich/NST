import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {GetCommentByIdQuery} from "../application/queries/get-comment-by-id/get-comment-by-id.query";
import {UpdateCommentCommand} from '../application/use-cases/update-comment/update-comment-command';
import {DeleteCommentCommand} from "../application/use-cases/delete-comment/delete-comment-command";
import {ChangeLikeCommentStatusCommand} from "../application/use-cases/change-like-status/change-like-status.command";
import {Request} from "express";
import {AuthGuard} from "../../../../core/guards/auth.guard";
import {ChangeStatusDto} from "../../posts/api/input-dto/change-status-dto";
import {CreateNewCommentInputDto} from "../../posts/api/input-dto/create-comment-for-post-dto";
import {UserIdGuard} from "../../../../core/guards/userId.quard";


@Controller('comments')
export class CommentsController {
    constructor(private readonly queryBus: QueryBus,
                private readonly commandBus: CommandBus) {
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Put(':commentId')
    async updateComment(@Body() {content}: CreateNewCommentInputDto, @Param('commentId') commentId: string, @Req() req: Request) {
        const userId = req.userId!
        return this.commandBus.execute(new UpdateCommentCommand(commentId, content, userId))
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Put(':commentId/like-status')
    async changeLikeCommentStatus(@Body() {likeStatus}: ChangeStatusDto, @Param('commentId') commentId: string, @Req() req: Request) {
        const user = req.user!
        return this.commandBus.execute(new ChangeLikeCommentStatusCommand(commentId, likeStatus, user))
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':commentId')
    async deleteComment(@Param('commentId') commentId: string, @Req() req: Request) {
        const userId = req.userId!
        return this.commandBus.execute(new DeleteCommentCommand(commentId, userId))
    }

    @Get(':id')
    @UseGuards(UserIdGuard)
    async getCommentById(@Param('id') id: string, @Req() req: Request) {
        const userId = req?.userId || undefined
        return this.queryBus.execute(new GetCommentByIdQuery(id, userId))
    }

}

