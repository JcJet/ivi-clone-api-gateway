import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCommentDto } from './dto/create-comment.dto';
import {GetCommentsDto} from "./dto/get-comments.dto";

@Injectable()
export class CommentsService {
  constructor(@Inject('ToCommentsMs') private commentsProxy: ClientProxy) {}

  async createComment(dto: CreateCommentDto) {
    console.log(
      'API Gateway - Comments Service - createComment at',
      new Date(),
    );
    return this.commentsProxy.send(
      { cmd: 'createComment' },
      { dto },
    );
  }

  async deleteComment(commentId: number) {
    console.log(
      'API Gateway - Comments Service - deleteComment at',
      new Date(),
    );
    return this.commentsProxy.send(
      { cmd: 'deleteComment' },
      { commentId },
    );
  }

  async updateComment(commentId: number, dto: CreateCommentDto) {
    console.log(
      'API Gateway - Comments Service - updateComment at',
      new Date(),
    );
    return this.commentsProxy.send(
      { cmd: 'updateComment' },
      { commentId, dto }
    );
  }
  async getComments(dto: GetCommentsDto) {
    console.log(
        'API Gateway - Comments Service - getComments at',
        new Date(),
    );
    return this.commentsProxy.send(
        { cmd: 'getComments' },
        { dto },
    );
  }
  async getCommentsTree(dto: GetCommentsDto) {
    console.log(
        'API Gateway - Comments Service - getCommentsTree at',
        new Date(),
    );
    return this.commentsProxy.send(
        { cmd: 'getCommentsTree' },
        { dto },
    );
  }

  async deleteCommentsFromEssence(dto: GetCommentsDto) {
    console.log(
        'API Gateway - Comments Service - deleteCommentsByEssence at',
        new Date(),
    );
    return this.commentsProxy.send(
        { cmd: 'deleteCommentsFromEssence' },
        { dto },
    );

  }
}
