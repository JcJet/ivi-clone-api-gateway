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
import {EssenceIdDto} from "./dto/essence-id-dto";

@Controller('comments')
@ApiTags('Comments MS API')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
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
  ) {
    console.log(
      'API Gateway - Comments Controller - createComment at',
      new Date(),
    );
    const essenceIdsDto: EssenceIdDto = { movieId, commentId, personId };
    return this.commentsService.createComment(createCommentDto, essenceIdsDto);
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
  ) {
    const essenceIdsDto: EssenceIdDto = { movieId, commentId, personId };
    return this.commentsService.getCommentsTree(essenceIdsDto);
  }
}
