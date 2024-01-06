import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class PokemonModel {
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
