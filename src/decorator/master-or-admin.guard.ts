import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { CommentsService } from '../comments/comments.service';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class MasterOrAdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private commentsService: CommentsService,
    private profileService: ProfileService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //Getting userId from token
    const authToken = context
      .switchToHttp()
      .getRequest()
      .headers.authorization.split(' ')[1];
    const userId = this.jwtService.verify(authToken, {
      secret: 'jwt-secret-key',
    }).userId;

    //Getting userId by accessed entity
    const commentsMethods = ['deleteComment', 'updateComment'];
    const profileMethods = ['deleteProfile', 'updateProfile'];

    const calledMethodName = context.getHandler().name;
    console.log(calledMethodName);
    console.log(context.switchToHttp().getRequest().params);

    if (commentsMethods.includes(calledMethodName)) {
      return true;
      const commentId = context.switchToHttp().getRequest().params.id;
      const accessedComment = await lastValueFrom(
        await this.commentsService.getCommentById(commentId),
      );

      return accessedComment.userId == userId;
    } else if (profileMethods.includes(calledMethodName)) {
      const profileId = context.switchToHttp().getRequest().params.id;
      const accessedProfile = await this.profileService.getProfileById(
        profileId,
      );

      return accessedProfile.userId == userId;
    }

    return false;
  }
}
