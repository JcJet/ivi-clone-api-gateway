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
          urls: ['amqp://localhost:5672'],
          queue: 'to_genres_ms',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [GenresService],
  controllers: [GenresController],
})
export class GenresModule {}
