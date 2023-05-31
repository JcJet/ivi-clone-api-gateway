import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ToRolesMs',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RMQ_URL],
            queue: 'toRolesMs',
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
