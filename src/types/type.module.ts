import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { TypeResolver } from 'src/graphql/resolver/type.resolver';
import { TypeClient } from 'src/grpc/clients/type.client';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TYPE_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'proto',
          protoPath: join(__dirname, '../../src/grpc/proto/type.proto'),
          url: 'localhost:50053',
        },
      },
    ]),
  ],
  providers: [TypeResolver, TypeClient],
  exports: [TypeClient],
})
export class TypeModule {}
