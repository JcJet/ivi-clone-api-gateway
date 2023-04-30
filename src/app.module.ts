import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { UserModule } from './user/user.module';
import { GenresModule } from './genres/genres.module';
import { PersonsModule } from './persons/persons.module';

@Module({
  imports: [MoviesModule, UserModule, GenresModule, PersonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
