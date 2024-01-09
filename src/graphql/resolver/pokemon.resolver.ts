/* eslint-disable prettier/prettier */

/**
  - Aplicación que usa GraphQL para comunicarse
  con el servicio de entrenador.
  - Define los resolvers para las operaciones
  - Cada resolver es una funcion que se encarga
  de obtener los datos requeridos para un campo específico
  cuando se realiza una query o mutation GraphQL.
  Interactúa con master.service.ts para obtener o modificar
  los datos necesarios y luego devuelve esos datos
  en el formato esperado por el esquema de GraphQL.

  - ES EL PUENTE ENTRE EL CLIENTE Y EL SERVICIO DE USUARIO
  (GraphQL - Resolver - Lógica de negocios)
 */
  import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
  import { PokemonClient } from '../../grpc/clients/pokemon.client';
  import { PokemonModel } from '../models/pokemon.model';
  import { CreatePokemonInput,  UpdatePokemonInput,  } from '../models/inputs';
  import { CreatePokemonRequest, UpdatePokemonRequest } from 'src/grpc/interfaces/pokemon.dto';
  import { EliminacionPokemon } from '../models/outputs';
  
  import { Observable, catchError, map } from 'rxjs';
  
  
  
  @Resolver(() => PokemonModel)
  export class PokemonResolver {
    constructor(private pokemonClient: PokemonClient) {}
  
  
    @Query(() => PokemonModel)
    async getPokemon(@Args('id') id: string): Promise<PokemonModel> {
      const response = await this.pokemonClient.getPokemon({ id }).toPromise();
      return this.transformPokemonResponse(response);
    }
   
  
    @Query(() => [PokemonModel])
    listPokemons(): Observable<PokemonModel[]> {
      return this.pokemonClient.listPokemons({}).pipe(
        map((response) => response.pokemons.map(pokemon => this.transformPokemonResponse(pokemon))),
        catchError((error) => {
          console.log('Error al listar Pokemonos', error);
          throw new Error('Error al listar los Pokemonos');
        }),
      );
    }
  
    @Mutation(() => PokemonModel)
    createPokemon(
      @Args('createPokemonInput') input: CreatePokemonInput): Observable<PokemonModel> {
      const request: CreatePokemonRequest = {
        nombre: input.nombre,
        tipo: input.tipo,
        nivel: input.nivel,
        puntosSalud: input.puntosSalud,
        movimiento: input.movimiento,
      };
  
      return this.pokemonClient.createPokemon(request).pipe(
        map((response) => this.transformPokemonResponse(response)),
        catchError((error) => {
          console.log('Error al crear Pokemon', error);
          throw new Error('Error al crear el Pokemon');
        }),
      );
    }
  
    @Mutation(() => PokemonModel)
    updatePokemon(@Args('updatePokemonInput') input: UpdatePokemonInput): Observable<PokemonModel> {
      const request: UpdatePokemonRequest = {
        id: input.id,
        nombre: input.nombre ?? undefined,
        tipo: input.tipo ?? undefined,
        nivel: input.nivel ?? undefined,
        puntosSalud: input.puntosSalud ?? undefined,
        movimiento: input.movimiento ?? undefined,
      };
  
      return this.pokemonClient.updatePokemon(request).pipe(
        map((response) => this.transformPokemonResponse(response)),
        catchError((error) => {
          console.log('Error al actualizar Pokemon', error);
          throw new Error('Error al actualizar el Pokemon');
        }),
      );
    }
  
  @Mutation(() => EliminacionPokemon)
    deletePokemon(@Args('id') id: string): Observable<EliminacionPokemon> {
      return this.pokemonClient.deletePokemon({ id }).pipe(
        map((response) => this.transformEliminacionRespuesta(response)),
        catchError((error) => {
          console.log('Error al eliminar Pokemon', error);
          throw new Error('Error al eliminar el Pokemon');
        }),
      );
    }
  
    private transformPokemonResponse(response: any): PokemonModel {
      if(!response){
        throw new Error('No se encontró el Pokemono');
      }
      console.log("response", response.nombre);
      console.log("response", response.tipo);
      console.log("response", response.nivel);
      console.log("response", response.puntosSalud);
      console.log("response", response.movimiento);
      return {
        id: response.id,
        nombre: response.nombre,
        tipo: response.tipo,
        nivel: response.nivel,
        puntosSalud: response.puntosSalud,
        movimiento: response.movimiento,
      };
    }
  
    private transformEliminacionRespuesta(response: any): EliminacionPokemon {
      return {
        mensaje: response.mensaje,
      };
    }
  }
  