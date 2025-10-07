/*
import {Injectable} from "@nestjs/common";
import {PaginationQueriesType, SortType} from "../blogs/blogs.controller";

@Injectable()
export class PostsRepository {
    createPost(newPost: PostType) {
        /!* const createdPost = await PostModel.insertOne(newPost)
         await createdPost.save()
         return createdPost._id.toString()*!/
    }

    getAllPosts(query: PaginationQueriesType, userId?: string, blogId?: string): Promise<any> {
        /!*  const pageNumber = query.pageNumber
          const pageSize = query.pageSize
          const sortBy = query.sortBy
          const sortDirection = query.sortDirection === 'asc' ? 1 : -1
          const searchNameTerm = query.searchNameTerm
          let filter = {}
          if (searchNameTerm) {
              filter = {$regex: searchNameTerm, $option: 'i'}
          }
          if (blogId) {
              filter = {...filter, blogId}
          }
          const sortFilter: SortMongoType = {[sortBy]: sortDirection} as SortMongoType
          const posts = await PostModel
              .find(filter)
              .sort(sortFilter)
              .skip((pageNumber - 1) * pageSize)
              .limit(+pageSize)
              .lean().exec()
          const totalCount = await PostModel.countDocuments(filter)
          const userLikes = await LikePostModel.find({userId}).exec()
          const allLikes = await LikePostModel.find({myStatus: "Like"}).sort({createdAt: -1}).exec()
          return {
              pagesCount: Math.ceil(totalCount / query.pageSize),
              page: query.pageNumber,
              pageSize: query.pageSize,
              totalCount: totalCount,
              items: posts.map((post: PostDocument) => {
                  const currentLike = userLikes?.find(like => like.postId === String(post._id))
                  const last3likes = allLikes.filter(l => l.postId === String(post._id)).slice(0, 3)
                  return mapToOutputPost(post, currentLike?.myStatus, last3likes)
              })
          }
      }*!/


    }

    findPost(id: string, userId?: string) {
        /!*const postId = new ObjectId(id)
        const post = await PostModel.findById(postId).exec()
        const likeStatus = userId ? await LikePostModel.findOne({userId, postId}).exec() : undefined
        const last3likes = await LikePostModel.find({postId, myStatus: "Like"}).sort({createdAt: -1}).limit(3).exec()
        console.log(last3likes)
        if (post) return mapToOutputPost(post, likeStatus?.myStatus, last3likes)
        return null*!/
    }

    getComments(query: PaginationQueriesCommentType, postId: string, userId?: string) {
        /!*try {
            const pageNumber = +query.pageNumber
            const pageSize = +query.pageSize
            const sortBy = query.sortBy
            const sortDirection = query.sortDirection === 'asc' ? 1 : -1
            let filter = {postId}

            const sortFilter: SortMongoType = {[sortBy]: sortDirection} as SortMongoType
            const comments = await CommentModel
                .find(filter)
                .sort(sortFilter)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .exec()

            const totalCount = await CommentModel.countDocuments(filter).exec()
            const myLikes = await LikeModel.find({userId: userId}).exec()

            return {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: totalCount,
                items: comments.map(comment => {
                    const likeStatus = myLikes?.find(like => like.commentId.toString() === comment._id.toString())

                    return mapToOutputComment(comment, likeStatus?.myStatus)
                })
            }
        } catch (e) {
            console.log('Get posts for selected blog Error', e)
            return null
        }*!/
    }

    updatePost({params, body}: any) {
        /!*const postId = new ObjectId(params)
        const post = await PostModel.findById(postId).exec()
        if (!post) {
            return false
        }
        post.title = body.title
        post.content = body.content
        post.shortDescription = body.shortDescription
        post.blogId = body.blogId
        await post.save()

        await PostModel.findById(postId).exec()
    }

    async save(post: PostDocument) {
        await post.save()
        return post._id.toString()
    }*!/
    }

}


/!* const mapToOutputPost = (post: PostDocument, myStatus: LikeStatus = "None", last3likes: Array<LikePostDocument>): OutputPostType => {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        createdAt: post.createdAt,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        extendedLikesInfo: {
            likesCount: post.likesCount,
            dislikesCount: post.dislikesCount,
            myStatus: myStatus,
            newestLikes: last3likes.map(l => {
                return {
                    addedAt: l.createdAt,
                    login: l.login,
                    userId: l.userId
                }
            })
        }
    }
}*!/

type MapToOutputWithPagination = {
    "pagesCount": number,
    "page": number,
    "pageSize": number,
    "totalCount": number,
    //"items": Array<OutputPostType> | Array<OutputBlogType>
}

export type LikeStatus = "None" | "Like" | "Dislike"

type PaginationQueriesCommentType = {
    pageNumber: number
    pageSize: number
    sortBy: string
    sortDirection: SortType
}

/!*
const mapToOutputComment = (comment: CommentDocument, myStatus: LikeStatus = 'None'): OutputCommentType => {
    return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: {
            userId: comment.commentatorInfo.userId,
            userLogin: comment.commentatorInfo.userLogin,
        },
        likesInfo: {
            likesCount: comment.likeInfo.likeCount,
            dislikesCount: comment.likeInfo.dislikeCount,
            myStatus: myStatus || "None"
        },
        createdAt: comment.createdAt
    }
}*!/
*/
