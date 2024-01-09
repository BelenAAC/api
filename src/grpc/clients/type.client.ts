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
  CreateTypeRequest,
  CreateTypeResponse,
  DeleteTypeRequest,
  DeleteTypeResponse,
  GetTypeRequest,
  GetTypeResponse,
  ListTypesRequest,
  ListTypesResponse,
  UpdateTypeRequest,
  UpdateTypeResponse,
} from '../interfaces/type.dto';

interface ITypeService {
  createType(request: CreateTypeRequest): Observable<CreateTypeResponse>;
  getType(request: GetTypeRequest): Observable<GetTypeResponse>;
  updateType(request: UpdateTypeRequest): Observable<UpdateTypeResponse>;
  deleteType(request: DeleteTypeRequest): Observable<DeleteTypeResponse>;
  listTypes(request: ListTypesRequest): Observable<ListTypesResponse>;
}

@Injectable()
export class TypeClient implements OnModuleInit {
  public typeService: ITypeService;

  constructor(
    @Inject('TYPE_SERVICE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.typeService = this.client.getService<ITypeService>('TypeService');
  }

  createType(data: CreateTypeRequest): Observable<CreateTypeResponse> {
    return this.typeService.createType(data);
  }

  updateType(data: UpdateTypeRequest): Observable<UpdateTypeResponse> {
    return this.typeService.updateType(data);
  }

  deleteType(data: DeleteTypeRequest): Observable<DeleteTypeResponse> {
    return this.typeService.deleteType(data);
  }

  listTypes(data: ListTypesRequest): Observable<ListTypesResponse> {
    return this.typeService.listTypes(data);
  }

  getType(data: GetTypeRequest): Observable<GetTypeResponse> {
    return this.typeService.getType(data);
  }
}
