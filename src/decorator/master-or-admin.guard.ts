import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { CommentsService } from '../comments/comments.service';
import { ProfileService } from '../profile/profile.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MasterOrAdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private commentsService: CommentsService,
    private profileService: ProfileService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //Getting userId from token
    const authToken = context
      .switchToHttp()
      .getRequest()
      .headers.authorization.split(' ')[1];
    const userData: { userId: number; roles: string[] } =
      this.jwtService.verify(authToken, {
        secret: this.configService.get('JWT_SECRET_KEY'),
      });

    //Getting userId by accessed entity
    const commentsMethods = ['deleteComment', 'updateComment'];
    const profileMethods = ['deleteProfile', 'updateProfile'];

    const calledMethodName = context.getHandler().name;
    console.log(calledMethodName);
    console.log(context.switchToHttp().getRequest().params);

    if (commentsMethods.includes(calledMethodName)) {
      // Comments section
      const commentId = context.switchToHttp().getRequest().params.id;
      const accessedComment = await lastValueFrom(
        await this.commentsService.getCommentById(commentId),
      );

      return accessedComment.userId == userData.userId;
    } else if (profileMethods.includes(calledMethodName)) {
      // Profiles section
      const profileId = context.switchToHttp().getRequest().params.id;
      const accessedProfile = await this.profileService.getProfileById(
        profileId,
      );

      return accessedProfile.userId == userData.userId;
    }

    //Admin section
    return userData.roles.includes('ADMIN');
  }
}
