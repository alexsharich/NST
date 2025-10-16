import {Injectable, NotFoundException} from '@nestjs/common';
import {BlogViewDto} from "../../../blogs/api/view-dto/blog.view-dto";

@Injectable()
export class CommentsQueryRepository {
    constructor() {
    }
    /*async getByIdOrNotFoundFail(id: string): Promise<CommentViewDto> {
        const comment = await this.CommentModel.findById(id)
        if (!comment) {
            throw new NotFoundException('Comment not found')
        }
        return BlogViewDto.mapToView(comment)
    }*/

}