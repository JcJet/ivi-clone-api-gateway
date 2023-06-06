import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { GoogleStrategy } from './auth-strategies/google.strategy';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ToProfilesMs',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RMQ_URL],
            queue: 'toProfilesMs',
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'ToFilesMs',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RMQ_URL],
            queue: 'toFilesMs',
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
    JwtModule,
    forwardRef(() => CommentsModule),
    ConfigModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService, GoogleStrategy],
  exports: [ProfileService],
})
export class ProfileModule {}
