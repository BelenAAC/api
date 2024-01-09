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
  import { MasterClient } from '../../grpc/clients/master.client';
  import { MasterModel } from '../models/master.model';
  import { CreateMasterInput, LoginMasterInput, UpdateMasterInput } from '../models/inputs';
  import { CreateMasterRequest, LoginMasterRequest, LoginMasterResponse, LogoutMasterRequest, LogoutMasterResponse, UpdateMasterRequest } from 'src/grpc/interfaces/master.dto';
  import { LogoutMensaje, EliminacionEntrenador } from '../models/outputs';
  import { PayloadModel } from '../models/outputs';
  import { Observable, catchError, map } from 'rxjs';
  
  
  @Resolver(() => MasterModel)
  export class MasterResolver {
    constructor(private masterClient: MasterClient) {}
  
    @Query(() => MasterModel)
    getMaster(@Args('id') id: string): Observable<MasterModel> {
      return this.masterClient.getMaster({ id }).pipe(
        map((response) => this.transformMasterResponse(response)),
        catchError((error) => {
          console.log('Error al obtener entrenador', error);
          throw new Error('Error al obtener el entrenador');
        }),
      )
    }
  
    @Query(() => [MasterModel])
    listMasters(): Observable<MasterModel[]> {
      return this.masterClient.listMasters({}).pipe(
        map((response) => response.masters.map(master => this.transformMasterResponse(master))),
        catchError((error) => {
          console.log('Error al listar entrenadores', error);
          throw new Error('Error al listar los entrenadores');
        }),
      );
    }
  
    @Mutation(() => MasterModel)
    createMaster(@Args('createMasterInput') input: CreateMasterInput): Observable<MasterModel> {
      const request: CreateMasterRequest = { 
        nombre: input.nombre,
        correo: input.correo,
        contrasena: input.contrasena,
        nivel: input.nivel,
        idCompanero: input.idCompanero,
      };
  
      return this.masterClient.createMaster(request).pipe(
        map((response) => this.transformMasterResponse(response)),
        catchError((error) => {
          console.log('Error al crear entrenador', error);
          throw new Error('Error al crear el entrenador');
        }),
      );
    }
  
    @Mutation(() => MasterModel)
    updateMaster(@Args('updateMasterInput') input: UpdateMasterInput): Observable<MasterModel> {
      const request: UpdateMasterRequest = {
        id: input.id,
        // Solo se asignan los campos si están definidos en la entrada
        nombre: input.nombre ?? undefined,
        correo: input.correo ?? undefined,
        nivel: input.nivel ?? undefined,
        idCompanero: input.idCompanero ?? undefined,
      };
  
      return this.masterClient.updateMaster(request).pipe(
        map((response) => this.transformMasterResponse(response)),
        catchError((error) => {
          console.log('Error al actualizar entrenador', error);
          throw new Error('Error al actualizar el entrenador');
        }),
      );
    }
  
    @Mutation(() => PayloadModel)
    loginMaster(@Args('loginMasterInput') input: LoginMasterInput): Observable<LoginMasterResponse> {
      const request: LoginMasterRequest = { 
        correo: input.correo,
        contrasena: input.contrasena,
      };
      console.log("request", request)
      return this.masterClient.loginMaster(request).pipe(
        map((response) => this.transformPayloadResponse(response)),
        catchError((error) => {
          console.log('Error al iniciar sesión', error);
          throw new Error('Error al iniciar sesión. '+error);
        }),
      );
    }
  
    @Mutation(() => LogoutMensaje)
    logoutMaster(@Args('id') id: string): Observable<LogoutMasterResponse> {
      const request: LogoutMasterRequest = { 
        masterID: id,
      };
      return this.masterClient.logoutMaster(request).pipe(
        map((response) => this.transformLogoutResponse(response)),
        catchError((error) => {
          console.log('Error al cerrar sesión', error);
          throw new Error('Error al cerrar sesión. '+error);
        }),
      );
    }
  
    @Mutation(() => EliminacionEntrenador)
    deleteMaster(@Args('id') id: string): Observable<EliminacionEntrenador> {
      return this.masterClient.deleteMaster({ id }).pipe(
        map((response) => this.transformEliminacionRespuesta(response)),
        catchError((error) => {
          console.log('Error al eliminar entrenador', error);
          throw new Error('Error al eliminar el entrenador');
        }),
      );
    }
  
  
  
    private transformLogoutResponse(response: any ): LogoutMasterResponse {
      
      return {
        mensaje: response.mensaje,
      };
    }
  
    private transformPayloadResponse(response: any ): LoginMasterResponse {
      console.log("response", response)
      return {
        token: response.token,
        master: this.transformMasterResponse(response.master),
      };
    }
  
    private transformMasterResponse(response: any): MasterModel {
      if(!response){
        throw new Error('No se encontró el entrenador');
      }
      console.log("response", response.nombre);
      console.log("response", response.correo);
      console.log("response", response.nivel);
      console.log("response", response.idCompanero);
      return {
        id: response.id,
        nombre: response.nombre,
        correo: response.correo,
        nivel: response.nivel,
        idCompanero: response.idCompanero,
      };
    }
  
    private transformEliminacionRespuesta(response: any): EliminacionEntrenador {
      return {
        mensaje: response.mensaje,
          };
    }
  
  
  }