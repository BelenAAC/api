export interface CreatePokemonRequest {
  nombre: string;
  tipo: string;
  nivel: string;
  puntosSalud: string;
  movimiento: string;
}

export interface CreatePokemonResponse {
  id: string;
}

export interface GetPokemonRequest {
  id: string;
}

export interface GetPokemonResponse {
  id: string;
  nombre: string;
  tipo: string;
  nivel: string;
  puntosSalud: string;
  movimiento: string;
}

export interface UpdatePokemonRequest {
  id: string;
  nombre?: string;
  tipo?: string;
  nivel?: string;
  puntosSalud?: string;
  movimiento?: string;
}

export interface UpdatePokemonResponse {
  id: string;
  nombre: string;
  tipo: string;
  nivel: string;
  puntosSalud: string;
  movimiento: string;
}

export interface DeletePokemonRequest {
  id: string;
}

export interface DeletePokemonResponse {
  mensaje: string;
}

export interface ListPokemonsRequest {}

export interface ListPokemonsResponse {
  pokemons: Pokemon[];
}

export interface LogoutPokemonRequest {
  pokemonID: string;
}

export interface LogoutPokemonResponse {
  mensaje: string;
}

export interface Pokemon {
  id: string;
  nombre: string;
  tipo: string;
  nivel: string;
  puntosSalud: string;
  movimiento: string;
}
