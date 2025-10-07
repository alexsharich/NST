/*
import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query} from "@nestjs/common";
import {BlogsService} from "./blogs.service";
import {BlogsRepository} from "./blogs.repository";
import {PostsRepository} from "../posts/posts.repository";

@Controller('blogs')
export class BlogsController {
    constructor(protected blogsService: BlogsService, protected blogsRepository: BlogsRepository, protected postsRepository: PostsRepository) {
    }

    @Post()
    createBlog(@Body() inputModel: InputBlogType) {
        const isNewBlogCreated = this.blogsService.createBlog(inputModel)
        if (isNewBlogCreated) {
            const newBlog = this.blogsRepository.findBlog(isNewBlogCreated)
            if (newBlog) {
                //res.status(201).json(newBlog)
                return
            }
        }
        //res.sendStatus(404)
    }

    @Get()
    getBlog(@Query('term') term: PaginationQueriesType) {
        /!*const sortFilter = paginationQueries(term)
        const blogs = this.blogsRepository.getBlogs(sortFilter)
        if (blogs) {
            res.status(200).send(blogs)
        }*!/
    }

    @Get(':id')
    findBlog(@Param('id') id: string) {
        const blog = this.blogsRepository.findBlog(id)
        if (!blog) {
            /!* res.sendStatus(404)
             return*!/
        }
        //res.status(200).send(foundBlog)
    }

    @Delete(':id')
    deleteBlog(@Param('id') id: string) {
        const isDeletedBlog = this.blogsService.deleteBlog(id)
        /!*if (!isDeletedBlog) {
            res.sendStatus(404)
            return
        }
        res.sendStatus(204)*!/
    }

    @Put(':id')
    updateBlog(@Param('id') id: string, @Body() inputModel: InputBlogType) {
        const isBlogUpdated = this.blogsService.updateBlog({params: id, body: inputModel})
        if (!isBlogUpdated) {
            //res.sendStatus(404)
            return
        }
        const updatedBLog = this.blogsRepository.findBlog(id)
        // res.status(204).send(updatedBLog)

    }

    @Post(':id/post')
    createPostForSelectedBlog(@Param('id') id: string, @Body() inputModel: InputPostForBlogType) {
        const newPostCreated = this.blogsService.createPostForSelectedBlog({
            blogId: id,
            body: inputModel
        })
        if (newPostCreated === null) {
            //res.sendStatus(407)
            return
        }
        const newPost = this.postsRepository.findPost(newPostCreated)
        if (!newPost) {
            //res.sendStatus(406)
            return
        }
        //res.status(201).json(newPost)

    }

    @Get(':id/post')
    getPostsForSelectedBlog(@Param('id') id: string, @Query('term') term: InputPostForBlogType) {
        const {pageNumber, pageSize, sortBy, sortDirection, searchNameTerm} = paginationQueries(term)
        const blogId: string = id
        const userId = req.userId // TODO
        const blog = this.blogsRepository.findBlog(blogId)
        if (!blog) {
            // res.sendStatus(404)
            return
        }
        const posts = this.postsRepository.getAllPosts(
            {pageSize, pageNumber, sortDirection, sortBy, searchNameTerm},
            userId,
            blogId,
        )
        if (!posts) {
            //res.sendStatus(404)
            return
        }
        // res.status(200).send(posts)
    }
}


type InputBlogType = {
    name: string;
    description: string;
    websiteUrl: string;
}
type InputPostForBlogType = {
    title: string;
    shortDescription: string;
    content: string;
}
export type PaginationQueriesType = {
    pageNumber: number
    pageSize: number
    sortBy: string
    sortDirection: SortType
    searchNameTerm: string | null
}
export type SortType = 'desc' | 'asc'
export type InputPostForBlogType = {
    title: string,
    shortDescription: string,
    content: string,
}
export const paginationQueries = (query: PaginationQueriesType) => {
    const pageNumber = query.pageNumber ? +query.pageNumber : 1
    const pageSize = query.pageSize ? +query.pageSize : 10
    const sortBy = query.sortBy ? query.sortBy.toString() : 'createdAt'
    const sortDirection: SortType = query.sortDirection && query.sortDirection === 'asc' ? 'asc' : 'desc'
    const searchNameTerm = query.searchNameTerm ? query.searchNameTerm.toString() : null

    return {pageNumber, pageSize, sortBy, sortDirection, searchNameTerm}
}*/
