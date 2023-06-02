import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { GenresModule } from './genres/genres.module';
import { PersonsModule } from './persons/persons.module';
import { ProfileModule } from './profile/profile.module';
import { FilesModule } from './files/files.module';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MoviesModule,
    GenresModule,
    PersonsModule,
    ProfileModule,
    FilesModule,
    CommentsModule,
    RolesModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    JwtModule.register({
      secret: 'SECRET',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule],
})
export class AppModule {}
