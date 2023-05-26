import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('comments')
@ApiTags('Comments MS API')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create comment.',
    description:
      'Either one query element must be used - movieId or commentId.' +
      ' Depends on what is an essence object for comment.',
  })
  @ApiQuery({
    name: 'movieId',
    description: 'Use if comment at the top of hierarchy.',
    required: false,
  })
  @ApiQuery({
    name: 'commentId',
    description: 'Use if comment NOT at the top of hierarchy.',
    required: false,
  })
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Query('movieId') movieId: number,
    @Query('commentId') commentId: number,
  ) {
    console.log(
      'API Gateway - Comments Controller - createComment at',
      new Date(),
    );
    return this.commentsService.createComment(
      createCommentDto,
      movieId,
      commentId,
    );
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete comment by its ID.' })
  deleteComment(@Param('id') commentId: number) {
    console.log(
      'API Gateway - Comments Controller - deleteComment at',
      new Date(),
    );
    return this.commentsService.deleteComment(commentId);
  }

  @Delete()
  @ApiExcludeEndpoint()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete comments by essenceTable, essenceId' })
  async deleteCommentsByEssence(
    @Query('essenceTable') essenceTable: string,
    @Query('essenceId') essenceId: number,
  ) {
    return this.commentsService.deleteCommentsFromEssence({
      essenceTable,
      essenceId,
    });
  }

  @Put('/:id')
  @ApiExcludeEndpoint()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update comment by its ID with JSON body.' })
  updateComment(
    @Param('id') commentId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    console.log(
      'API Gateway - Comments Controller - updateComment at',
      new Date(),
    );
    return this.commentsService.updateComment(commentId, createCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get comments by movieId or commentId' })
  @ApiQuery({ name: 'movieId', description: 'Must be used.', required: true })
  @ApiQuery({
    name: 'commentId',
    description: 'Must NOT be used!',
    required: false,
  })
  async getComments(
    @Query('movieId') movieId: number,
    @Query('commentId') commentId: number,
  ) {
    return this.commentsService.getCommentsTree(movieId, commentId);
  }
}
