import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ToMoviesMs',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL],
          queue: 'toMoviesMs',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesModule, MoviesService],
})
export class MoviesModule {}
