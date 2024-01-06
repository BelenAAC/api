/* eslint-disable prettier/prettier */
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class MasterModel {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;

  @Field()
  correo: string;

  @Field()
  nivel: string;

  @Field()
  idCompanero: string;

}