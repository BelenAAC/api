/* eslint-disable prettier/prettier */

export interface CreateMasterRequest {
    nombre: string;
    correo: string;
    contrasena: string;
    nivel:string;
    idCompanero: string;
  }
  export interface CreateMasterResponse {
    id: string;
  }
  
  export interface GetMasterRequest {
    id: string;
  }
  
  export interface GetMasterResponse {
    id: string;
    nombre: string;
    correo: string;
    nivel: string;
    idCompanero: string;
  }
  
  export interface UpdateMasterRequest {
    id: string;
    nombre?: string;
    correo?: string;
    nivel?: string;
    idCompanero?: string;
  }
  
  export interface UpdateMasterResponse {
    id: string;
    nombre: string;
    correo: string;
    nivel: string;
    idCompanero: string;
  }
  
  export interface DeleteMasterRequest {
    id: string;
  }
  
  export interface DeleteMasterResponse {
    mensaje: string;
  }
  export interface ListMastersRequest {}
  export interface ListMastersResponse {
    masters: Master[];
  }
  export interface LoginMasterRequest {
    correo: string;
    contrasena: string;
  }
  export interface LoginMasterResponse {
    token: string;
    master: Master;
  }
  export interface LogoutMasterRequest {
    masterID: string;
  }
  export interface LogoutMasterResponse {
    mensaje: string;
  }
  
  
  
  export interface Master {
    id: string;
    nombre: string;
    correo: string;
    nivel: string;
    idCompanero: string;
  }