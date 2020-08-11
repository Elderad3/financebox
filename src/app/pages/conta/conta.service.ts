import { Banco } from './../../shared/models/banco.model';
import { Observable } from 'rxjs';
import { APP_API } from './../../app.api';
import { Conta } from '../../shared/models/conta.model';

import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class ContaService extends BaseResourceService<Conta> {

  constructor(protected injector: Injector) {
    super(injector, 'conta')
  }
  /**
   * Lista todos os bancos
   */
  listarBancos(): Observable<Banco[]> {
    return this.http.get<Banco[]>(`${APP_API}/banco`)
  }

}


