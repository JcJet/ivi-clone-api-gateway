import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rmqUrl } from '../constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ToMoviesMs',
        transport: Transport.RMQ,
        options: {
          urls: [rmqUrl],
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
