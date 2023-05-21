import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ToCommentsMs',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL], // 'amqp://localhost:5672' if starting on localhost
          queue: 'toCommentsMs',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
