/*
import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query} from "@nestjs/common";
import {LikeStatus, PostsRepository} from "./posts.repository";
import {paginationQueries, PaginationQueriesType} from "../blogs/blogs.controller";
import {UsersRepository} from "../users/users.repository";
import {PostsService} from "./posts.service";

@Controller('posts')
export class PostsController {
    constructor( protected postsRepository: PostsRepository, protected postsService: PostsService, protected commentsRepository: CommentsRepository, protected commentsService:CommentsService, protected usersRepository: UsersRepository) {
    }

    @Put('/:id/like-status')
    changePostLikeStatus(@Param('id') id: string, @Body() inputModel: { likeStatus: LikeStatus }) {
        const userId = req.userId// TODO
        const result = this.postsService.changeLikeStatus(id, inputModel.likeStatus, userId)
        if (!result) {
           // res.sendStatus(404)
            return
        }
        //res.sendStatus(204)
    }

    @Get('/:id/comments')
    getPostComments(@Param('id') id: string, @Query('term') term: PaginationQueriesType) {
        const queries = paginationQueries(term)
        const userId = req.userId //TODO
        const result = this.commentsRepository.getComments(queries, id, userId)
        //res.status(200).send(result)
    }

    @Post('/:id/comments')
    createCommentForPost(@Param('id')id:string, @Body() inputModel:InputCommentType) {
        const userId = req.userId
        const isPostExist = this.postsRepository.findPost(id)
        if (!isPostExist) {
           // res.sendStatus(404)
            return
        }
        if (!userId) {
           // res.sendStatus(401)
            return
        }
        const user = this.usersRepository.findUser(userId)
        if (!user) {
           // res.sendStatus(401)
            return

        }

        const createdComment = this.commentsService.createComment({
            userId: userId,
            userLogin: user.login,
            postId: id,
            content: inputModel.content
        })
        if (!createdComment) {
            //res.sendStatus(500)
            return
        }
        //res.status(201).send(createdComment)
    }

    @Get()
    getPost(@Query('term') term: PaginationQueriesType) {
        const sortFilter = paginationQueries(term)
        const userId = req.userId //TODO
        const posts = this.postsRepository.getAllPosts(sortFilter, userId)
        if (posts) {
            //res.status(200).json(posts)
        }
    }

    @Post()
    createPost(@Query() inputModel: InputPostType) {
        const newPostCreated = this.postsService.createPost(inputModel)

        if (!newPostCreated) {
            //res.sendStatus(404)
            return
        }
        const newPost = this.postsRepository.findPost(newPostCreated)
        //res.status(201).json(newPost)
    }

    @Get('/:id')
    findPost(@Param('id') id: string) {
        const userId = req.userId //TODO
        const foundPost = this.postsRepository.findPost(id, userId)
        if (!foundPost) {
            //res.sendStatus(404)
            return;
        }
        //res.status(200).json(foundPost)
    }

    @Delete('/:id')
    deletePost(@Param('id') id: string) {
        const isDeletedPost = this.postsService.deletePost(id)
        if (!isDeletedPost) {
            //res.sendStatus(404)
            return
        }
        //res.sendStatus(204)
    }

    @Put('/:id')
    updatePost(@Param('id') id: string , @Body() inputModel:InputPostType) {
        const isPostUpdated = this.postsService.updatePost({params:id, body: inputModel})
        if (!isPostUpdated) {
            //res.sendStatus(404)
            return
        }
        //res.status(204).send(isPostUpdated)
    }
}


type InputPostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
}
export type InputCommentType = {
    content: string
}*/
