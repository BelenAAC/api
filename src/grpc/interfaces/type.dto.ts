export interface CreateTypeRequest {
  nombre: string;
  descripcion: string;
}

export interface CreateTypeResponse {
  id: string;
}

export interface GetTypeRequest {
  id: string;
}

export interface GetTypeResponse {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface UpdateTypeRequest {
  id: string;
  nombre?: string;
  descripcion?: string;
}

export interface UpdateTypeResponse {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface DeleteTypeRequest {
  id: string;
}

export interface DeleteTypeResponse {
  mensaje: string;
}

export interface ListTypesRequest {}

export interface ListTypesResponse {
  types: Type[];
}

export interface LogoutTypeRequest {
  typeID: string;
}

export interface LogoutTypeResponse {
  mensaje: string;
}

export interface Type {
  id: string;
  nombre: string;
  descripcion: string;
}
