import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class TypeModel {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;

  @Field()
  descripcion: string;
}
