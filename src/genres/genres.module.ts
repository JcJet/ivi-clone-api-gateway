import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ToGenresMs',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RMQ_URL],
            queue: 'toGenresMs',
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
    JwtModule,
  ],
  providers: [GenresService],
  controllers: [GenresController],
  exports: [GenresModule, GenresService],
})
export class GenresModule {}
