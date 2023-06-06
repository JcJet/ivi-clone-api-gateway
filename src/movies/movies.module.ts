import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ToMoviesMs',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RMQ_URL],
            queue: 'toMoviesMs',
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
    JwtModule,
    ConfigModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesModule, MoviesService],
})
export class MoviesModule {}
