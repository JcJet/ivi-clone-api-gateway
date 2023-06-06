import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ToPersonsMs',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RMQ_URL],
            queue: 'toPersonsMs',
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
  controllers: [PersonsController],
  providers: [PersonsService],
  exports: [PersonsModule, PersonsService],
})
export class PersonsModule {}
