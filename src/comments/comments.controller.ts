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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetCommentsDto } from './dto/get-comments.dto';

@Controller('comments')
@ApiTags('Comments MS API')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create comment.' })
  createComment(@Body() createCommentDto: CreateCommentDto) {
    console.log(
      'API Gateway - Comments Controller - createComment at',
      new Date(),
    );
    return this.commentsService.createComment(createCommentDto);
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
  @ApiOperation({ summary: 'Get comments by essenceTable, essenceId' })
  async getComments(
    @Query('essenceTable') essenceTable: string,
    @Query('essenceId') essenceId: number,
    @Query('nestedComments') nestedComments: boolean,
  ) {
    const dto: GetCommentsDto = { essenceTable, essenceId };
    return nestedComments
      ? this.commentsService.getCommentsTree(dto)
      : this.commentsService.getComments(dto);
  }
}
