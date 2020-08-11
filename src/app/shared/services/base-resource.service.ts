import { APP_API } from './../../app.api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injector } from '@angular/core';

import { BaseResourceModel } from '../models/base-resource.model';

export abstract class BaseResourceService<T extends BaseResourceModel>{
    protected http: HttpClient;
    constructor(protected injector: Injector, protected endpoint: string) {
        this.http = injector.get(HttpClient)
    }
    /**
      * Cria ou salva a entidade
      * @param resource
      */
    salvar(resource: T): Observable<T> {
        if (resource._id != null && resource._id != undefined) {
            return this.http.put<T>(`${APP_API}/${this.endpoint}/${resource._id}`, resource)
        } else {
            return this.http.post<T>(`${APP_API}/${this.endpoint}`, resource)
        }
    }
    /**
     * Lista todos os registros da entidade 
     */
    listar(): Observable<T[]> {
        return this.http.get<T[]>(`${APP_API}/${this.endpoint}`)
    }
    /**
     * busca a entidade pelo identificador
     * @param id 
     */
    buscarPorId(_id: any) {
        return this.http.get(`${APP_API}/${this.endpoint}/${_id}`)
    }
    /**
     * Exclui a entidade de acordo com o identificador
     * @param id 
     */
    excluir(_id: any) {
        return this.http.delete(`${APP_API}/${this.endpoint}/${_id}`)
    }
}


