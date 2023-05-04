import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto) {
    console.log(
      'API Gateway - Comments Controller - createComment at',
      new Date(),
    );
    return this.commentsService.createComment(createCommentDto);
  }

  @Delete('/:id')
  deleteComment(@Param('id') commentId: number) {
    console.log(
      'API Gateway - Comments Controller - deleteComment at',
      new Date(),
    );
    return this.commentsService.deleteComment(commentId);
  }

  @Put('/:id')
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
}
