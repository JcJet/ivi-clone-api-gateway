import { Module } from '@nestjs/common';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rmqUrl } from '../constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ToPersonsMs',
        transport: Transport.RMQ,
        options: {
          urls: [rmqUrl], // 'amqp://localhost:5672' if starting on localhost
          queue: 'toPersonsMs',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [PersonsController],
  providers: [PersonsService],
})
export class PersonsModule {}
