import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { EssenceIdDto } from './dto/essence-id-dto';
import { JwtAuthGuard } from '../decorator/jwt-auth.guard';
import { MasterOrAdminGuard } from '../decorator/master-or-admin.guard';
import { RolesGuard } from '../decorator/roles.guard';
import { Roles } from '../decorator/roles.decorator';

@Controller('comments')
@ApiTags('Comments MS API')
export class CommentsController {
  constructor(
    private commentsService: CommentsService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create comment.',
    description:
      'Either one query element must be used - movieId, commentId, or personId' +
      ' Depends on what is an essence object for comment.',
  })
  @ApiQuery({
    name: 'movieId',
    description: 'Use if new comment at the top of comments hierarchy.',
    required: false,
  })
  @ApiQuery({
    name: 'commentId',
    description: 'Use if new comment NOT at the top of comments hierarchy.',
    required: false,
  })
  @ApiQuery({
    name: 'personId',
    description: 'Use if new comment at the top of comments hierarchy.',
    required: false,
  })
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Query('movieId') movieId: number,
    @Query('commentId') commentId: number,
    @Query('personId') personId: number,
    @Headers() headers: { authorization: string },
  ): Promise<Observable<object>> {
    console.log(
      'API Gateway - Comments Controller - createComment at',
      new Date(),
    );

    const userData: { userId: number } = this.jwtService.verify(
      headers.authorization.split(' ')[1],
      { secret: this.configService.get('JWT_SECRET_KEY') },
    );
    createCommentDto.author.userId = userData.userId;

    const essenceIdsDto: EssenceIdDto = { movieId, commentId, personId };
    return this.commentsService.createComment(createCommentDto, essenceIdsDto);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, MasterOrAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete comment by its ID.' })
  deleteComment(@Param('id') commentId: number): Promise<Observable<object>> {
    console.log(
      'API Gateway - Comments Controller - deleteComment at',
      new Date(),
    );

    return this.commentsService.deleteComment(commentId);
  }

  @Delete() //admin
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiExcludeEndpoint()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete comments by essenceTable, essenceId' })
  async deleteCommentsByEssence(
    @Query('essenceTable') essenceTable: string,
    @Query('essenceId') essenceId: number,
  ): Promise<Observable<object>> {
    console.log(
      'API Gateway - Comments Controller - deleteCommentsByEssence at',
      new Date(),
    );

    return this.commentsService.deleteCommentsFromEssence({
      essenceTable,
      essenceId,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get comments by movieId or personId.' })
  @ApiQuery({ name: 'movieId', description: 'Must be used.', required: false })
  @ApiQuery({ name: 'personId', description: 'Must be used.', required: false })
  @ApiQuery({
    name: 'commentId',
    description: 'SERVICE. Must NOT be used!',
    required: false,
  })
  async getComments(
    @Query('movieId') movieId: number,
    @Query('commentId') commentId: number,
    @Query('personId') personId: number,
  ): Promise<Observable<object>> {
    console.log(
      'API Gateway - Comments Controller - getComments at',
      new Date(),
    );

    const essenceIdsDto: EssenceIdDto = { movieId, commentId, personId };
    return this.commentsService.getCommentsTree(essenceIdsDto);
  }
}
