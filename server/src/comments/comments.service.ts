import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../models/tasks/tasks.entity';
import { Repository } from 'typeorm';
import { Comment } from '../models/comments/comments.entity';
import { AddCommentDto } from '../models/comments/dto/add-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async addComment(addCommentDto: AddCommentDto) {
    try {
      const newComment = { ...new Comment(), ...addCommentDto };
      return await this.commentsRepository.save(newComment);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllComments() {
    try {
      return await this.commentsRepository.find();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }
}
