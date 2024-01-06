import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateMasterInput {
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

@InputType()
export class CreatePokemonInput {
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

@InputType()
export class UpdateMasterInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  nombre?: string;

  @Field({ nullable: true })
  correo?: string;

  @Field({ nullable: true })
  nivel?: string;

  @Field({ nullable: true })
  idCompanero?: string;
}

@InputType()
export class UpdatePokemonInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  nombre?: string;

  @Field({ nullable: true })
  tipo?: string;

  @Field({ nullable: true })
  nivel?: string;

  @Field({ nullable: true })
  puntosSalud?: string;

  @Field({ nullable: true })
  movimiento?: string;
}

@InputType()
export class DeleteMasterInput {
  @Field(() => ID)
  id: string;
}

@InputType()
export class LoginMasterInput {
  @Field()
  correo: string;

  @Field()
  contrasena: string;
}
export class DeletePokemonInput {
  @Field(() => ID)
  id: string;
}
