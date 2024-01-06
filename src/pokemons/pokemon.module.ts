import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { PokemonResolver } from 'src/graphql/resolver/pokemon.resolver';
import { PokemonClient } from 'src/grpc/clients/pokemon.client';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POKEMON_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'proto',
          protoPath: join(__dirname, '../../src/grpc/proto/pokemon.proto'),
          url: 'localhost:50052',
        },
      },
    ]),
  ],
  providers: [PokemonResolver, PokemonClient],
  exports: [PokemonClient],
})
export class PokemonModule {}
