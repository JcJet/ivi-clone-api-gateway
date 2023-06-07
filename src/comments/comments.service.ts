import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsDto } from './dto/get-comments.dto';
import { EssenceIdDto } from './dto/essence-id-dto';

@Injectable()
export class CommentsService {
  constructor(@Inject('ToCommentsMs') private commentsProxy: ClientProxy) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    essenceIds: { movieId: number; commentId: number; personId: number },
  ): Promise<Observable<object>> {
    console.log(
      'API Gateway - Comments Service - createComment at',
      new Date(),
    );

    const fullDto = await this.makeCommentDto(createCommentDto, essenceIds);
    return this.commentsProxy.send({ cmd: 'createComment' }, { dto: fullDto });
  }

  async deleteComment(commentId: number): Promise<Observable<object>> {
    console.log(
      'API Gateway - Comments Service - deleteComment at',
      new Date(),
    );

    return this.commentsProxy.send({ cmd: 'deleteComment' }, { commentId });
  }

  async deleteCommentsFromEssence(
    dto: GetCommentsDto,
  ): Promise<Observable<object>> {
    console.log(
      'API Gateway - Comments Service - deleteCommentsByEssence at',
      new Date(),
    );

    return this.commentsProxy.send(
      { cmd: 'deleteCommentsFromEssence' },
      { dto },
    );
  }

  async getCommentsTree(essenceIds: EssenceIdDto): Promise<Observable<object>> {
    console.log(
      'API Gateway - Comments Service - getCommentsTree at',
      new Date(),
    );

    await this.checkInputs(essenceIds);
    const dto = this.createEssenceDto(essenceIds);
    return this.commentsProxy.send({ cmd: 'getCommentsTree' }, { dto });
  }

  async getCommentById(commentId: number) {
    console.log(
      'API Gateway - Comments Service - getCommentById at',
      new Date(),
    );
    return this.commentsProxy.send({ cmd: 'getCommentById' }, { commentId });
  }

  private createEssenceDto(essenceIdsDto: EssenceIdDto) {
    this.checkInputs(essenceIdsDto);
    let essenceTable: string;
    let essenceId: number;

    if (essenceIdsDto.movieId) {
      essenceTable = 'movies';
      essenceId = essenceIdsDto.movieId;
    } else if (essenceIdsDto.commentId) {
      essenceTable = 'comments';
      essenceId = essenceIdsDto.commentId;
    } else if (essenceIdsDto.personId) {
      essenceTable = 'persons';
      essenceId = essenceIdsDto.personId;
    }

    return { essenceTable, essenceId };
  }

  private checkInputs(essenceIdsDto: EssenceIdDto) {
    const idsCount = Object.entries(essenceIdsDto).filter(
      ([, value]) => value !== undefined,
    ).length;

    if (idsCount > 1) {
      throw new HttpException(
        'Противоречивый запрос: указано более одного идентификатора',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (idsCount == 0) {
      throw new HttpException(
        'Не задан movieId, commentId или personId (чувствительно к регистру)',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async makeCommentDto(createCommentDto: CreateCommentDto, essenceIds) {
    //не захотели работать через essenceTable&essenceId...
    const essenceDto = await this.createEssenceDto(essenceIds);
    return { ...createCommentDto, ...essenceDto };
  }
}
