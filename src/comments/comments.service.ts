import { Inject, Injectable } from '@nestjs/common';
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
}
