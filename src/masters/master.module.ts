/* eslint-disable prettier/prettier */

import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { MasterResolver } from 'src/graphql/resolver/master.resolver';
import { MasterClient } from 'src/grpc/clients/master.client';

@Global()
@Module({
  imports: [
    
    ClientsModule.register([
      {
        name: 'MASTER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'proto',
          protoPath: join(__dirname, '../../src/grpc/proto/master.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
  

  ],
  providers: [MasterResolver, MasterClient],
  exports: [MasterClient],
})
export class MasterModule {}