import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsDto } from './dto/get-comments.dto';

@Injectable()
export class CommentsService {
  constructor(@Inject('ToCommentsMs') private commentsProxy: ClientProxy) {}

  createEssenceDto(movieId, commentId) {
    let essenceTable: string;
    let essenceId: number;
    if (movieId) {
      essenceTable = 'movies';
      essenceId = movieId;
    } else if (commentId) {
      essenceTable = 'comments';
      essenceId = commentId;
    }
    return { essenceTable, essenceId };
  }
  checkInputs(movieId, commentId) {
    if (movieId && commentId) {
      throw new HttpException(
        'Противоречивый запрос: указаны movieId и commentId',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!(movieId || commentId)) {
      throw new HttpException(
        'Не задан movieId или commentId (чувствительно к регистру)',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async createComment(
    createCommentDto: CreateCommentDto,
    movieId: number,
    commentId: number,
  ) {
    console.log(
      'API Gateway - Comments Service - createComment at',
      new Date(),
    );
    this.checkInputs(movieId, commentId);
    const essenceDto = this.createEssenceDto(movieId, commentId);
    const fullDto = { ...createCommentDto, ...essenceDto };
    return this.commentsProxy.send({ cmd: 'createComment' }, { dto: fullDto });
  }

  async deleteComment(commentId: number) {
    console.log(
      'API Gateway - Comments Service - deleteComment at',
      new Date(),
    );
    return this.commentsProxy.send({ cmd: 'deleteComment' }, { commentId });
  }

  async updateComment(commentId: number, dto: CreateCommentDto) {
    console.log(
      'API Gateway - Comments Service - updateComment at',
      new Date(),
    );
    return this.commentsProxy.send(
      { cmd: 'updateComment' },
      { commentId, dto },
    );
  }
  async getComments(dto: GetCommentsDto) {
    console.log('API Gateway - Comments Service - getComments at', new Date());
    return this.commentsProxy.send({ cmd: 'getComments' }, { dto });
  }
  async getCommentsTree(movieId: number, commentId: number) {
    console.log(
      'API Gateway - Comments Service - getCommentsTree at',
      new Date(),
    );

    this.checkInputs(movieId, commentId);
    const dto = this.createEssenceDto(movieId, commentId);
    return this.commentsProxy.send({ cmd: 'getCommentsTree' }, { dto });
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
