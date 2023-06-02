import { Module } from '@nestjs/common';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';

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
  ],
  controllers: [PersonsController],
  providers: [PersonsService],
  exports: [PersonsModule, PersonsService],
})
export class PersonsModule {}
