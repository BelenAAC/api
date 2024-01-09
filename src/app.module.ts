/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MasterModule } from './masters/master.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PokemonModule } from './pokemons/pokemon.module';
import { TypeModule } from './types/type.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    MasterModule,PokemonModule,TypeModule
  
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
