import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { GenresModule } from './genres/genres.module';
import { PersonsModule } from './persons/persons.module';
import { ProfileModule } from './profile/profile.module';
import { FilesModule } from './files/files.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    MoviesModule,
    GenresModule,
    PersonsModule,
    ProfileModule,
    FilesModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
