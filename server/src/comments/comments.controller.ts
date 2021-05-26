import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AddCommentDto } from '../models/comments/dto/add-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getAllComments() {
    return this.commentsService.getAllComments();
  }

  @Post()
  addComment(@Body() addCommentDto: AddCommentDto) {
    return this.commentsService.addComment(addCommentDto);
  }
}
