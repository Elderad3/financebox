import { APP_API } from './../../app.api';
import { Transacao } from '../../shared/models/transacao.model';

import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService extends BaseResourceService<Transacao> {

  constructor(protected injector: Injector) {
    super(injector, 'transacao')
  }

  /**
 * Busca Transações por mês
 * @param id 
 */
  transacaoPorMes(mes: number) {
    return this.http.get(`${APP_API}/transacao?mes=${mes}`)

  }

  transacoesPorCategoria(id: number) {
    return this.http.get(`${APP_API}/transacao?categoria.id=${id}`)
  }

  transacoesPorCategoriaMesAno(categoriaId: number, mes: number, ano: number) {
    return this.http.get(`${APP_API}/transacao?categoria.id=${categoriaId}&mes=${mes}&ano=${ano}`)
  }

  transacoesPorAno(ano: number) {
    return this.http.get(`${APP_API}/transacao/${ano}`)
  }

  transacoesPorAnoMes(ano: number, mes: number, ) {
    return this.http.get(`${APP_API}/transacao/${ano}/${mes}`)
  }


  transacoesPorAnoMesConta(ano: number, mes: number, numeroConta: string) {
    return this.http.get(`${APP_API}/transacao/${ano}/${mes}/${numeroConta}`)
  }

  enviarArquivo(formData) {
    return this.http.post(`${APP_API}/transacao/extrato`, formData)

  }

  meses = [
    { nome: 'Janeiro', codigo: 0 },
    { nome: 'Fevereiro', codigo: 1 },
    { nome: 'Março', codigo: 2 },
    { nome: 'Abril', codigo: 3 },
    { nome: 'Maio', codigo: 4 },
    { nome: 'Junho', codigo: 5 },
    { nome: 'Julho', codigo: 6 },
    { nome: 'Agosto', codigo: 7 },
    { nome: 'Setembro', codigo: 8 },
    { nome: 'Outubro', codigo: 9 },
    { nome: 'Novembro', codigo: 10 },
    { nome: 'Dezembro', codigo: 11 },
  ]

  anos = [
    { codigo: 2018 },
    { codigo: 2019 },
    { codigo: 2020 },
    { codigo: 2021 },
    { codigo: 2022 },
    { codigo: 2023 },

  ]


}


