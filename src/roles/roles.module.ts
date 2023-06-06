import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

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
    JwtModule,
    ConfigModule,
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
