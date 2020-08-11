import { Grupo } from './../../shared/models/grupo.model';
import { Observable } from 'rxjs';
import { APP_API } from './../../app.api';
import { Categoria } from '../../shared/models/categoria.model';

import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseResourceService<Categoria> {

  constructor(protected injector: Injector) {
    super(injector, 'categoria')
  }

  /**
   * Lista todos os grupos
   */
  listarGrupos(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${APP_API}/grupo`)
  }

}


