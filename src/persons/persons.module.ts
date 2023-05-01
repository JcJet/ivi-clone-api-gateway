import { Module } from '@nestjs/common';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ToPersonsMs',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
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