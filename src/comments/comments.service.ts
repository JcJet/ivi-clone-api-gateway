import { Body, Inject, Injectable, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(@Inject('ToCommentsMs') private commentsProxy: ClientProxy) {}

  async createComment(createCommentDto: CreateCommentDto) {
    console.log(
      'API Gateway - Comments Service - createComment at',
      new Date(),
    );
    return this.commentsProxy.send(
      { cmd: 'createComment' },
      { ...createCommentDto },
    );
  }

  async deleteComment(commentId: number) {
    console.log(
      'API Gateway - Comments Service - deleteComment at',
      new Date(),
    );
    return this.commentsProxy.send(
      { cmd: 'deleteComment' },
      { commentId: commentId },
    );
  }

  async updateComment(commentId: number, createCommentDto: CreateCommentDto) {
    console.log(
      'API Gateway - Comments Service - updateComment at',
      new Date(),
    );
    return this.commentsProxy.send(
      { cmd: 'deleteComment' },
      {
        commentId: commentId,
        createCommentDto: createCommentDto,
      },
    );
  }
}
