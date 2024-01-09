/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
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
} from 'src/grpc/interfaces/Type.dto';

interface TypeGrpcService {
  createType(request: CreateTypeRequest): Observable<CreateTypeResponse>;
  getType(request: GetTypeRequest): Observable<GetTypeResponse>;
  updateType(request: UpdateTypeRequest): Observable<UpdateTypeResponse>;
  deleteType(request: DeleteTypeRequest): Observable<DeleteTypeResponse>;
  listTypes(request: ListTypesRequest): Observable<ListTypesResponse>;
}

@Injectable()
export class TypeService {
  private TypeGrpcService: TypeGrpcService;

  constructor(@Inject('Type_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.TypeGrpcService = this.client.getService<TypeGrpcService>('TypeService');
  }

  createType(data: CreateTypeRequest): Observable<CreateTypeResponse> {
    
    return this.TypeGrpcService.createType(data);
  }

  updateType(data: UpdateTypeRequest): Observable<UpdateTypeResponse> {
    return this.TypeGrpcService.updateType(data);
  }

  deleteType(data: DeleteTypeRequest): Observable<DeleteTypeResponse> {
    return this.TypeGrpcService.deleteType(data);
  }

  getType(data: GetTypeRequest): Observable<GetTypeResponse> {
    return this.TypeGrpcService.getType(data);
  }

  listTypes(data: ListTypesRequest): Observable<ListTypesResponse> {
    return this.TypeGrpcService.listTypes(data);
  }
}