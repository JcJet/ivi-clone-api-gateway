import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { GenresModule } from './genres/genres.module';
import { PersonsModule } from './persons/persons.module';
import { ProfileModule } from './profile/profile.module';
import { CommentsModule } from './comments/comments.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    MoviesModule,
    GenresModule,
    PersonsModule,
    ProfileModule,
    CommentsModule,
    RolesModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    JwtModule.register({}),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule],
})
export class AppModule {}
