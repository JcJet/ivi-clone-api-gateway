import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ToProfileMs',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],  // 'amqp://localhost:5672' if starting on localhost
          queue: 'toProfileMs',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
