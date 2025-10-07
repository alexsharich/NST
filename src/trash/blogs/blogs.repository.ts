/*
import {Injectable} from "@nestjs/common";
import {PaginationQueriesType} from "./blogs.controller";

@Injectable()
export class BlogsRepository {
    createBlog(inputModel) { // TODO FIX MODEL
       /!* try {
            const createdBlog = await BlogModel.insertOne(newBlog)
            await createdBlog.save()
            return createdBlog._id.toHexString()
        } catch (e) {
            console.log('Create blog error : ', e)
            return null
        }*!/
    }
    updateBlog({params, body}: any){//TODO FIX MODEL
        /!*try {
            const blog = await BlogModel.findById(params).exec()

            if (!blog) {
                return null
            }

            blog.name = body.name
            blog.description = body.description
            blog.websiteUrl = body.websiteUrl

            await blog.save()
            return true

        } catch (e) {
            return null
        }*!/
    }

    findBlog(id: string) {
        /!*  const blog = await BlogModel.findById(id).exec()
          if (!blog) {
              return null
          }
          return mapToOutputBlog(blog)
      }*!/
    }

    deleteBlog(id: string) {
        /!*try {
            const result = await BlogModel.deleteOne({_id: id}).exec()
            return result.deletedCount === 1;
        } catch (e) {
            return false
        }*!/
    }

    getBlogs(sortFilter: PaginationQueriesType) {
        /!*try {
            const pageNumber = query.pageNumber
            const pageSize = query.pageSize
            const sortBy = query.sortBy
            const sortDirection = query.sortDirection === 'asc' ? 1 : -1
            const searchNameTerm = query.searchNameTerm
            let filter = {}
            if (searchNameTerm) {
                filter = {name: {$regex: searchNameTerm, $options: 'i'}}
            }

            const sortFilter: SortMongoType = {[sortBy]: sortDirection} as SortMongoType

            const blogs = await BlogModel.find(filter)
                .sort(sortFilter)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .lean().exec()
            const totalCount = await BlogModel.countDocuments(filter)
            return {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: totalCount,
                items: blogs.map((blog: BlogDocument) => mapToOutputBlog(blog))
            }
        } catch (e) {
            console.log('blogs query repo / get blogs : ', e)
            throw new Error('Blogs not found')
        }*!/
    }
}

export const mapToOutputBlog = (blog: any) => {//TODO type
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership,
    }
}
*/
