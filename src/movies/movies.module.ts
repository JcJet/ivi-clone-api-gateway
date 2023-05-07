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
          urls: ['amqp://rabbitmq:5672'],  // 'amqp://localhost:5672' if starting on localhost
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
})
export class MoviesModule {}
