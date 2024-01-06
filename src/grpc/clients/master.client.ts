/* eslint-disable prettier/prettier */
/*
  - Configuraciones de gRPC en NestJS
  - Define el cliente gRPC para comunicarse con 
  el servicio de entrenador
  - Es utilizado por el master.service.ts para
  llamar a operaciones específicas del microservicio de
  entrenador.
*/
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CreateMasterRequest,
  CreateMasterResponse,
  DeleteMasterRequest,
  DeleteMasterResponse,
  GetMasterRequest,
  GetMasterResponse,
  ListMastersRequest,
  ListMastersResponse,
  LoginMasterRequest,
  LoginMasterResponse,
  LogoutMasterRequest,
  LogoutMasterResponse,
  UpdateMasterRequest,
  UpdateMasterResponse,
  
} from '../interfaces/master.dto';

interface IMasterService {
  createMaster(request: CreateMasterRequest): Observable<CreateMasterResponse>;
  getMaster(request: GetMasterRequest): Observable<GetMasterResponse>;
  updateMaster(request: UpdateMasterRequest): Observable<UpdateMasterResponse>;
  deleteMaster(request: DeleteMasterRequest): Observable<DeleteMasterResponse>;
  listMasters(request: ListMastersRequest): Observable<ListMastersResponse>;
  loginMaster(request: LoginMasterRequest): Observable<LoginMasterResponse>;
  logoutMaster(request: LogoutMasterRequest): Observable<LogoutMasterResponse>;
}

@Injectable()
export class MasterClient implements OnModuleInit {
  public masterService: IMasterService;

  constructor(
    @Inject('MASTER_SERVICE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.masterService = this.client.getService<IMasterService>('MasterService');
  }

  createMaster(data: CreateMasterRequest): Observable<CreateMasterResponse> {
    return this.masterService.createMaster(data);
  }

  updateMaster(data: UpdateMasterRequest): Observable<UpdateMasterResponse> {
    return this.masterService.updateMaster(data);
  }

  deleteMaster(data: DeleteMasterRequest): Observable<DeleteMasterResponse> {
    return this.masterService.deleteMaster(data);
  }

  listMasters(data: ListMastersRequest): Observable<ListMastersResponse> {
    return this.masterService.listMasters(data);
  }

  getMaster(data: GetMasterRequest): Observable<GetMasterResponse> {
    return this.masterService.getMaster(data);
  }

  loginMaster(data: LoginMasterRequest): Observable<LoginMasterResponse> {
    return this.masterService.loginMaster(data);
  }

  logoutMaster(data: LogoutMasterRequest): Observable<LogoutMasterResponse> {
    return this.masterService.logoutMaster(data);
  }
}