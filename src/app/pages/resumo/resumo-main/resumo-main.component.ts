import { NgForm } from '@angular/forms';
import { ErrorService } from '../../../shared/services/error.service';
import { CategoriaService } from '../../categoria/categoria.service';
import { TransacaoService } from '../../transacao/transacao.service';
import { Transacao } from '../../../shared/models/transacao.model';
import { Categoria } from '../../../shared/models/categoria.model';
import { tap, take } from 'rxjs/operators';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ResumoService } from '../resumo.service';


@Component({
  selector: 'app-resumo',
  templateUrl: './resumo-main.component.html',
  styleUrls: ['./resumo-main.component.css']
})
export class ResumoMainComponent implements OnInit {
  titulo: string = "Dashboard"
  totalDespesaMes: any = 0
  totalReceitaMes: any = 0
  categorias: Categoria[] = []
  transacoes: Transacao[] = []
  despesaData: any;
  receitaData: any;
  receitaDespesaData: any;

  @ViewChild("filtroForm", { static: false })
  filtroForm: NgForm
  anoFiltro: any
  mesFiltro: any
  meses: any
  anos: any

  transacoesAno: Transacao[] = []
  despesaAnoData: any;
  receitaDespesaAnoData: any;

  mes: Date = new Date
  carregandoDados: boolean = true

  chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  ngOnInit() {
    this.meses = this.transacaoService.meses
    this.anos = this.transacaoService.anos
    this.carregarFiltro()
    this.inicializar()
  }

  inicializar() {
    this.carregarCategoriasTransacoes()
    setTimeout(() => {
      this.carregarDadosDosGraficos()
      this.carregandoDados = false
    }, 1000);
  }

  constructor(private transacaoService: TransacaoService,
    private categoriaService: CategoriaService,
    private errorService: ErrorService,
    private resumoService: ResumoService) {
  }

  carregarCategoriasTransacoes() {
    this.categoriaService.listar().pipe(take(1)).subscribe((categorias) => { this.setarCategorias(categorias) })
    this.transacaoService.transacoesPorAnoMes(this.anoFiltro.codigo, this.mesFiltro.codigo).pipe(take(1)).subscribe((transacoes: Transacao[]) => { this.setarTransacoes(transacoes) })
    this.transacaoService.transacoesPorAno(this.anoFiltro.codigo).pipe(take(1)).subscribe((transacoes: Transacao[]) => { this.setarTransacoesAno(transacoes) })
  }

  carregarDadosDosGraficos() {
    this.popularValoresGraficoReceita()
    this.popularValoresGraficoDespesa()
    this.calcularTotalDespesaDoMes()
    this.calcularTotalReceitaDoMes()
    this.popularGraficoReceitaDespesaMes()
    this.popularValoresGraficoDespesaAno()
  }

  popularValoresGraficoReceita() {
    this.receitaData = this.resumoService.configurarDadosgraficoMes(this.transacoes, this.categorias, "receita")
  }
  popularValoresGraficoDespesa() {
    this.despesaData = this.resumoService.configurarDadosgraficoMes(this.transacoes, this.categorias, "despesa")
  }

  popularValoresGraficoDespesaAno() {
    this.despesaAnoData = this.resumoService.configurarDadosgraficoAno(this.transacoesAno, this.meses)
    console.log("Dados do gráfico de despesa no Ano: " + JSON.stringify(this.despesaAnoData))
  }

  calcularTotalDespesaDoMes() {
    this.totalDespesaMes = this.resumoService.calcularTotalDespesaDoMes(this.transacoes)
  }

  calcularTotalReceitaDoMes() {
    this.totalReceitaMes = this.resumoService.calcularTotalReceitaMes(this.transacoes)
  }

  popularGraficoReceitaDespesaMes() {
    this.receitaDespesaData = {
      labels: ['No mês'],
      datasets: [
        {
          label: 'Receitas',
          backgroundColor: '#247BA0',
          data: [this.totalReceitaMes]
        },
        {
          label: 'Despesas',
          backgroundColor: '#E36414',
          data: [this.totalDespesaMes * -1]
        }
      ]
    }
    console.log(this.receitaDespesaData.datasets[0].data)
  }

  /**
* Lista todas as propriedades existentes
*/
  listarCategorias() {
    this.categoriaService.listar().pipe(
      take(1)
    ).subscribe((categorias) => {
      this.categorias = categorias;
    }, err => {
      this.errorService.handle(err)
    })
  }

  /**
  * lista transações por ano e mes
  */
  transacoesPorAnoMes() {
    this.transacaoService.transacoesPorAnoMes(2020, 7).pipe(
      take(1))
      .subscribe((transacoes: Transacao[]) => {
        this.transacoes = transacoes;
      },
        err => {
          this.errorService.handle(err)
        }
      )
  }

  /**
* lista transações por ano e mes
*/
  transacoesPorAno() {
    this.transacaoService.transacoesPorAno(new Date().getFullYear()).pipe(
      take(1))
      .subscribe((transacoes: Transacao[]) => {
        this.transacoesAno = transacoes;
      },
        err => {
          this.errorService.handle(err)
        }
      )
  }

  setarCategorias(categorias) {
    this.categorias = categorias
  }

  setarTransacoes(transacoes) {
    this.transacoes = transacoes
  }

  setarTransacoesAno(transacoes) {
    this.transacoesAno = transacoes
  }

  /**
* carrega os valores do filtro
*/
  carregarFiltro() {
    let mesFiltrado = this.filtrarMesAtual();
    let anoFiltrado = this.filtrarAnoAtual()
    this.mesFiltro = mesFiltrado
    this.anoFiltro = anoFiltrado
    this.carregarCategoriasTransacoes()
  }

  /**
* Limpa o filtro de pesquisa
*/
  limparFiltro() {
    // this.filtroForm.reset()
    let mesFiltrado = this.filtrarMesAtual();
    let anoFiltrado = this.filtrarAnoAtual()
    this.mesFiltro = mesFiltrado
    this.anoFiltro = anoFiltrado
    this.filtroForm.value.ano = this.anoFiltro
    this.filtroForm.value.mes = this.mesFiltro
    this.inicializar()

  }


  filtrarMesAtual() {
    return this.meses.filter(mes => mes.codigo === new Date().getMonth())[0]
  }

  filtrarAnoAtual() {
    return this.anos.filter(ano => ano.codigo === new Date().getFullYear())[0]
  }


}
