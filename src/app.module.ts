import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { UserModule } from './user/user.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [MoviesModule, UserModule, GenresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
