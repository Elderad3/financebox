import { Categoria } from '../../shared/models/categoria.model';
import { Transacao } from '../../shared/models/transacao.model';

import { HttpClient } from '@angular/common/http';
import { APP_API } from '../../app.api';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ResumoService {

  constructor(private http: HttpClient) { }


  /**
   * Busca receitas por mês
   * @param id 
   */
  receitasPorMes(mes: number) {
    return this.http.get(`${APP_API}/receita?mes=${mes}`)
  }

  /**
 * Busca receitas por ano
 * @param id 
 */
  receitasPorAno(ano: number) {
    return this.http.get(`${APP_API}/receita?ano=${ano}`)
  }

  calcularTotalDespesaNoAno(transacoes: Transacao[]) {
    let totalDespesa = 0;
    transacoes.forEach(transacao => {
      if (transacao.valor < 0)
        totalDespesa += transacao.valor
    });
    return totalDespesa
  }

  calcularTotalDespesaDoMes(transacoes: Transacao[]) {
    let totalDespesa = 0;
    transacoes.forEach(transacao => {
      if (transacao.valor < 0)
        totalDespesa += transacao.valor
    });
    return totalDespesa
  }

  calcularTotalReceitaMes(transacoes: Transacao[]) {
    let totalReceita = 0;
    transacoes.forEach(transacao => {
      if (transacao.valor > 0)
        totalReceita += transacao.valor
    });
    return totalReceita
  }

  configurarDadosgraficoMes(transacoes: Transacao[], categorias: Categoria[], tipoFiltro: string) {
    const chartData = []
    categorias.forEach(categoria => {
      // filtra transacoes ativas não ignoradas por categoria e grupo
      const transacoesFiltradas = transacoes.filter(
        transacao => (transacao.categoria._id === categoria._id) && (transacao.isAtivo === true || transacao.isAtivo === null) && (tipoFiltro === "receita" ? transacao.valor > 0 : transacao.valor < 0));
      // se existe transacoes Filtradas soma os valores por categoria
      if (transacoesFiltradas.length > 0) {
        //const valorTotal = transacoesFiltradas.reduce((total, transacao) => total + transacao.valor,0)
        const valorTotal = transacoesFiltradas.map((transacao) => transacao.valor).reduce((total, preco) => total + preco, 0)
        //console.log("Categoria: " + categoria.nome + " valor: " + valorTotal)
        chartData.push({
          nomeCategoria: categoria.nome,
          total: valorTotal,
          cor: categoria.cor
        })
      }

    });
    return {
      labels: chartData.map(item => item.nomeCategoria),
      datasets: [
        {
          data: chartData.map(item => item.total),
          backgroundColor: chartData.map(item => item.cor)
        }]
    };
  }

  configurarDadosgraficoAno(transacoes: Transacao[], meses) {
    const chartData = []
    meses.forEach(mes => {
      // filtra transacoes ativas não ignoradas por mês
      const transacoesFiltradas = transacoes.filter(
        transacao => (transacao.mes === mes.codigo) && (transacao.ano === new Date().getFullYear()) && (transacao.isAtivo === true || transacao.isAtivo === null) && (transacao.valor < 0));
      // se existe transacoes Filtradas soma os valores por Mês
      if (transacoesFiltradas.length > 0) {
        //const valorTotal = transacoesFiltradas.reduce((total, transacao) => total + transacao.valor,0)
        let valorTotal = transacoesFiltradas.map((transacao) => transacao.valor).reduce((total, preco) => total + preco, 0)
        console.log("Mes: " + mes.nome + " valor: " + valorTotal)
        valorTotal = valorTotal * -1
        chartData.push({
          mes: mes.nome,
          total: valorTotal,
        })
      }

    });
    return {
      labels: chartData.map(item => item.mes),
      datasets: [
        {
          label: 'Despesas no mês',
          data: chartData.map(item => item.total),
          backgroundColor: '#E36414'
        }]
    };
  }

}