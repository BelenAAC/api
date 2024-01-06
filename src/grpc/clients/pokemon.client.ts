/* eslint-disable prettier/prettier */
/*
  - Configuraciones de gRPC en NestJS
  - Define el cliente gRPC para comunicarse con 
  el servicio de usuario
  - Es utilizado por el pokemon.service.ts para
  llamar a operaciones específicas del microservicio de
  usuario.
*/
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CreatePokemonRequest,
  CreatePokemonResponse,
  DeletePokemonRequest,
  DeletePokemonResponse,
  GetPokemonRequest,
  GetPokemonResponse,
  ListPokemonsRequest,
  ListPokemonsResponse,
  UpdatePokemonRequest,
  UpdatePokemonResponse,
} from '../interfaces/pokemon.dto';

interface IPokemonService {
  createPokemon(request: CreatePokemonRequest): Observable<CreatePokemonResponse>;
  getPokemon(request: GetPokemonRequest): Observable<GetPokemonResponse>;
  updatePokemon(request: UpdatePokemonRequest): Observable<UpdatePokemonResponse>;
  deletePokemon(request: DeletePokemonRequest): Observable<DeletePokemonResponse>;
  listPokemons(request: ListPokemonsRequest): Observable<ListPokemonsResponse>;
}

@Injectable()
export class PokemonClient implements OnModuleInit {
  public pokemonService: IPokemonService;

  constructor(
    @Inject('POKEMON_SERVICE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.pokemonService = this.client.getService<IPokemonService>('PokemonService');
  }

  createPokemon(data: CreatePokemonRequest): Observable<CreatePokemonResponse> {
    return this.pokemonService.createPokemon(data);
  }

  updatePokemon(data: UpdatePokemonRequest): Observable<UpdatePokemonResponse> {
    return this.pokemonService.updatePokemon(data);
  }

  deletePokemon(data: DeletePokemonRequest): Observable<DeletePokemonResponse> {
    return this.pokemonService.deletePokemon(data);
  }

  listPokemons(data: ListPokemonsRequest): Observable<ListPokemonsResponse> {
    return this.pokemonService.listPokemons(data);
  }

  getPokemon(data: GetPokemonRequest): Observable<GetPokemonResponse> {
    return this.pokemonService.getPokemon(data);
  }
}
