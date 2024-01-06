/* eslint-disable prettier/prettier */
/*
  - Contiene la lógica de negocio del servicio de entrenador
  - Acá se definen los métodos para manipular datos: CRUD
  - Interactúa con el cliente gRPC para realizar las 
  operaciones sobre el servicio de entrenador.
  - Es el responsable de llamar los métodos de
  master.client.ts para comunicarse con el microservicio
  de entrenador.

  Métodos deben coincidir con los definidos en master.proto
*/

import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateMasterRequest, CreateMasterResponse, DeleteMasterRequest, DeleteMasterResponse, GetMasterRequest, GetMasterResponse, ListMastersRequest, ListMastersResponse, UpdateMasterRequest, UpdateMasterResponse } from 'src/grpc/interfaces/master.dto';

interface MasterGrpcService {
  createMaster(request: CreateMasterRequest): Observable<CreateMasterResponse>;
  getMaster(request: GetMasterRequest): Observable<GetMasterResponse>;
  updateMaster(request: UpdateMasterRequest): Observable<UpdateMasterResponse>;
  deleteMaster(request: DeleteMasterRequest): Observable<DeleteMasterResponse>;
  listMasters(request: ListMastersRequest): Observable<ListMastersResponse>;
}

@Injectable()
export class MasterService {
  private masterGrpcService: MasterGrpcService;

  constructor(@Inject('USER_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.masterGrpcService = this.client.getService<MasterGrpcService>('MasterService');
  }

  createMaster(data: CreateMasterRequest): Observable<CreateMasterResponse> {
    
    return this.masterGrpcService.createMaster(data);
  }

  updateMaster(data: UpdateMasterRequest): Observable<UpdateMasterResponse> {
    return this.masterGrpcService.updateMaster(data);
  }

  deleteMaster(data: DeleteMasterRequest): Observable<DeleteMasterResponse> {
    return this.masterGrpcService.deleteMaster(data);
  }

  getMaster(data: GetMasterRequest): Observable<GetMasterResponse> {
    return this.masterGrpcService.getMaster(data);
  }

  listMasters(data: ListMastersRequest): Observable<ListMastersResponse> {
    return this.masterGrpcService.listMasters(data);
  }
}