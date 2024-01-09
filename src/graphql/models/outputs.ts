/* eslint-disable prettier/prettier */
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { MasterModel } from './master.model';

@ObjectType()
export class EliminacionPokemon {
  @Field()
  mensaje: string;
}

@ObjectType()
export class EliminacionEntrenador {
  @Field()
  mensaje: string;
}

@ObjectType()
export class EliminacionTipo {
  @Field()
  mensaje: string;
}

@ObjectType()
export class EntrenadorUpdate{
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;

  @Field()
  correo: string;

  @Field()
  contrasena: string;

  @Field()
  nivel: string;

  @Field()
  idCompanero: string;

}

@ObjectType()
export class PayloadModel {

  @Field()
  token: string;

  @Field()
  master: MasterModel; 

}

@ObjectType()
export class LogoutMensaje {
  @Field()
  mensaje: string;

}

@ObjectType()
export class PokemonUpdate{
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;

  @Field()
  tipo: string;

  @Field()
  nivel: string;

  @Field()
  puntosSalud: string;

  @Field()
  movimiento: string;
}
