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
  import { TypeClient } from '../../grpc/clients/type.client';
  import { TypeModel } from '../models/type.model';
  import { CreateTypeInput,  UpdateTypeInput,  } from '../models/inputs';
  import { CreateTypeRequest, UpdateTypeRequest } from 'src/grpc/interfaces/type.dto';
  import { EliminacionTipo } from '../models/outputs';
  
  import { Observable, catchError, map } from 'rxjs';
  
  
  
  @Resolver(() => TypeModel)
  export class TypeResolver {
    constructor(private typeClient: TypeClient) {}
  
  
    @Query(() => TypeModel)
    async getType(@Args('id') id: string): Promise<TypeModel> {
      const response = await this.typeClient.getType({ id }).toPromise();
      return this.transformTypeResponse(response);
    }
   
  
    @Query(() => [TypeModel])
    listTypes(): Observable<TypeModel[]> {
      return this.typeClient.listTypes({}).pipe(
        map((response) => response.types.map(type => this.transformTypeResponse(type))),
        catchError((error) => {
          console.log('Error al listar Tipos', error);
          throw new Error('Error al listar los Tipeos');
        }),
      );
    }
  
    @Mutation(() => TypeModel)
    createType(
      @Args('createTypeInput') input: CreateTypeInput): Observable<TypeModel> {
      const request: CreateTypeRequest = {
        nombre: input.nombre,
        descripcion: input.descripcion,
      };
  
      return this.typeClient.createType(request).pipe(
        map((response) => this.transformTypeResponse(response)),
        catchError((error) => {
          console.log('Error al crear Type', error);
          throw new Error('Error al crear el Type');
        }),
      );
    }
  
    @Mutation(() => TypeModel)
    updateType(@Args('updateTypeInput') input: UpdateTypeInput): Observable<TypeModel> {
      const request: UpdateTypeRequest = {
        id: input.id,
        nombre: input.nombre ?? undefined,
        descripcion: input.descripcion ?? undefined,
      };
  
      return this.typeClient.updateType(request).pipe(
        map((response) => this.transformTypeResponse(response)),
        catchError((error) => {
          console.log('Error al actualizar Type', error);
          throw new Error('Error al actualizar el Type');
        }),
      );
    }
  
  @Mutation(() => EliminacionTipo)
    deleteType(@Args('id') id: string): Observable<EliminacionTipo> {
      return this.typeClient.deleteType({ id }).pipe(
        map((response) => this.transformEliminacionRespuesta(response)),
        catchError((error) => {
          console.log('Error al eliminar Type', error);
          throw new Error('Error al eliminar el Type');
        }),
      );
    }
  
    private transformTypeResponse(response: any): TypeModel {
      if(!response){
        throw new Error('No se encontró el Typeo');
      }
      console.log("response", response.nombre);
      console.log("response", response.descripcion);
      return {
        id: response.id,
        nombre: response.nombre,
        descripcion: response.descripcion,
      };
    }
  
    private transformEliminacionRespuesta(response: any): EliminacionTipo {
      return {
        mensaje: response.mensaje,
      };
    }
  }
  