export class CreateCommentCommand {
    constructor(public content: string, public postId: string, public userId: string, public userLogin: string) {

    }

}