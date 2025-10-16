import {Controller, Get, HttpCode, HttpStatus, Param} from '@nestjs/common';


@Controller('comments')
export class CommentsController {
    constructor() {
    }


    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async getComments(@Param('id') id: string) {
    }

}