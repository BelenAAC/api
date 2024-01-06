/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
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
} from 'src/grpc/interfaces/pokemon.dto';

interface PokemonGrpcService {
  createPokemon(request: CreatePokemonRequest): Observable<CreatePokemonResponse>;
  getPokemon(request: GetPokemonRequest): Observable<GetPokemonResponse>;
  updatePokemon(request: UpdatePokemonRequest): Observable<UpdatePokemonResponse>;
  deletePokemon(request: DeletePokemonRequest): Observable<DeletePokemonResponse>;
  listPokemons(request: ListPokemonsRequest): Observable<ListPokemonsResponse>;
}

@Injectable()
export class PokemonService {
  private PokemonGrpcService: PokemonGrpcService;

  constructor(@Inject('Pokemon_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.PokemonGrpcService = this.client.getService<PokemonGrpcService>('PokemonService');
  }

  createPokemon(data: CreatePokemonRequest): Observable<CreatePokemonResponse> {
    
    return this.PokemonGrpcService.createPokemon(data);
  }

  updatePokemon(data: UpdatePokemonRequest): Observable<UpdatePokemonResponse> {
    return this.PokemonGrpcService.updatePokemon(data);
  }

  deletePokemon(data: DeletePokemonRequest): Observable<DeletePokemonResponse> {
    return this.PokemonGrpcService.deletePokemon(data);
  }

  getPokemon(data: GetPokemonRequest): Observable<GetPokemonResponse> {
    return this.PokemonGrpcService.getPokemon(data);
  }

  listPokemons(data: ListPokemonsRequest): Observable<ListPokemonsResponse> {
    return this.PokemonGrpcService.listPokemons(data);
  }
}