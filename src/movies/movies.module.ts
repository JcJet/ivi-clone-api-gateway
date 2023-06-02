import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';

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
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesModule, MoviesService],
})
export class MoviesModule {}
