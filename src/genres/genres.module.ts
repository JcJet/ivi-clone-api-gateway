import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TO_GENRES_MS',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],  // 'amqp://localhost:5672' if starting on localhost
          queue: 'toGenresMs',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [GenresService],
  controllers: [GenresController],
  exports: [GenresModule, GenresService],
})
export class GenresModule {}
