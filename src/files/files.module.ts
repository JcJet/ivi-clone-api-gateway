import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rmqUrl } from '../constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ToFilesMs',
        transport: Transport.RMQ,
        options: {
          urls: [rmqUrl], // 'amqp://localhost:5672' if starting on localhost
          queue: 'toFilesMs',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
