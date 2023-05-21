import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ToGenresMs',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL],
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
