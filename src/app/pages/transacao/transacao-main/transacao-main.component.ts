import { Conta } from './../../../shared/models/conta.model';
import { ContaService } from './../../conta/conta.service';
import { Transacao } from './../../../shared/models/transacao.model';

import { CategoriaService } from './../../categoria/categoria.service';
import { Categoria } from './../../../shared/models/categoria.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { ErrorService } from './../../../shared/services/error.service';

import { TransacaoService } from './../transacao.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-transacao-main',
  templateUrl: './transacao-main.component.html',
  styleUrls: ['./transacao-main.component.css']
})
export class TransacaoMainComponent implements OnInit {
  titulo: string = "Transações"
  transacoes: Transacao[] = []
  transacaoSelecionada: Transacao
  categorias: Categoria[] = []
  display: boolean = false
  msgContent: string

  @ViewChild("transacaoForm", { static: false })
  transacaoForm: NgForm
  transacao: Transacao
  categoriasSelecao: SelectItem[] = []
  headerModalForm: string = ''
  displayDialogForm: boolean = false

  @ViewChild("extratoForm", { static: false })
  extratoForm: NgForm
  uploadedFiles: any[] = [];
  headerModalExtrato: string = ''
  displayDialogExtrato: boolean = false

  cols: any
  editandoTransacao: boolean = false
  categorizandoTransacao: boolean = false
  anoFiltro: any
  mesFiltro: any
  contaFiltro: Conta
  meses: any
  anos: any

  teste: any

  @ViewChild("filtroForm", { static: false })
  filtroForm: NgForm
  carregandoDados = true
  selectedTransacao: Transacao;
  contas: Conta[]

  constructor(
    private transacaoService: TransacaoService,
    private categoriaService: CategoriaService,
    private contaService: ContaService,
    private errorService: ErrorService,
    private confirmationService: ConfirmationService,
    private toasty: MessageService) { }

  ngOnInit() {
    this.transacao = new Transacao
    this.meses = this.transacaoService.meses
    this.anos = this.transacaoService.anos
    this.carregarTabela()
    setTimeout(() => {
      this.carregarFiltro();
      this.carregandoDados = false
    }, 1000);
    this.listarCategorias()
    this.listarContas()
  }
  /**
    * Carrega propriedades da da tabela
    */
  carregarTabela() {
    this.cols = [
      // { field: 'isAtivo', header: 'Não ignorado?' },
      // { field: 'mes', header: 'Mes' },
      // { field: 'ano', header: 'Ano' },
      { field: 'conta.numeroConta', header: 'Conta' },
      { field: 'data', header: 'Data', tipo: 'normal' },
      { field: 'descricao', header: 'Descrição', },
      { field: 'categoria.nome', header: 'Categoria' },
      { field: 'valor', header: 'Valor', tipo: 'dinheiro' },


    ];
  }

  /**
 * lista transações por ano e mes
 */
  transacoesPorAnoMes() {
    this.transacaoService.transacoesPorAnoMes(this.anoFiltro.codigo, this.mesFiltro.codigo).pipe(
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
   * lista transações por ano mes e conta
   */
  transacoesPorAnoMesConta() {
    this.transacaoService.transacoesPorAnoMesConta(this.anoFiltro.codigo, this.mesFiltro.codigo, this.contaFiltro.numeroConta).pipe(
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
   * Lista todas as categorias existentes
   */
  listarCategorias() {
    this.categoriaService.listar().pipe(
      take(1))
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
        this.categorias.forEach(categoria => {
          this.categoriasSelecao.push({ label: categoria.nome, value: categoria })
        })
      },
        err => {
          this.errorService.handle(err)
        }
      )
  }

  /**
  * Lista todas as contas bancárias existentes
  */
  listarContas() {
    this.contaService.listar().pipe(
      take(1)).subscribe(contas => {
        this.contas = contas
        console.log(this.contas[0])
      },
        err => {
          this.errorService.handle(err)
        })
  }

  /**
   * Envia comando para o service para remover uma propriedade
   * @param id 
   */
  excluirTransacao(id: number) {
    this.transacaoService.excluir(id).pipe(
      take(1))
      .subscribe(() => {
        this.toasty.add({ severity: 'success', summary: 'Sucesso', detail: `Exclusão Realizada` });
        this.transacoesPorAnoMesConta();
      })
  }

  /**
 * preparar insersão de item na lista de item
 */
  prepararIncersaoItem() {
    this.transacao = {
      _id: null, conta: null, codigo: '2938716293876', mes: new Date().getMonth(), ano: new Date().getFullYear(),
      tipo: null, valor: null, data: new Date, categoria: null, descricao: null, isAtivo: null
    };
    this.transacaoForm.reset()
    this.headerModalForm = "Inserir Transação"
    this.displayDialogForm = true
  }


  /**
 * Envia para o service para realizar o salvamento ou atualização da entidade
 */
  salvarTransacao() {
    this.categorizandoTransacao = false
    this.transacaoService.salvar(this.transacao).pipe(
      take(1),
    ).subscribe((transacao: Transacao) => {
      this.transacoesPorAnoMes()
      this.displayDialogForm = false
      this.toasty.add({ severity: 'success', summary: 'Sucesso', detail: `A transação  ${transacao.descricao} no valor de: ${transacao.valor} foi salva` });
    }, err => {
      this.errorService.handle(err)
    })

  }

  /**
* Exibe a confirmação de exclusão, se sim, exclui
*/
  ignorarTransacao(transacao: Transacao) {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja ignorar esta transação?',
      accept: () => {
        this.transacao = transacao
        this.transacao.isAtivo = false
        this.salvarTransacao()
      }
    })
  }

  /**
* edita item selecionaado da listagem
*/
  editarTransacao(transacao: Transacao) {
    this.editandoTransacao = true
    const conta = this.contas.filter(conta => conta._id === transacao.conta._id)[0]
    const categoria = this.categorias.filter(categoria => categoria._id === transacao.categoria._id)[0]
    this.transacao = {
      _id: transacao._id, codigo: transacao.codigo, conta: conta, tipo: transacao.tipo,
      mes: transacao.mes, ano: transacao.ano, data: transacao.data, categoria: categoria, isAtivo: transacao.isAtivo,
      valor: transacao.valor, descricao: transacao.descricao
    };
    this.headerModalForm = "Editar Transação"
    this.displayDialogForm = true
  }
  /**
* edita item selecionaado da listagem
*/
  categorizarTransacao(transacao: Transacao) {
    this.categorizandoTransacao = true
    this.transacao = { ...transacao };
    this.headerModalForm = "Categorizar Transação"
    this.displayDialogForm = true
  }
  /**
* cancela inserção ou edição no dialog
*/
  cancelar() {
    this.transacaoForm.reset()
    this.displayDialogForm = false
    this.categorizandoTransacao = false
  }

  /**
    * carrega objeto em coluna de tabela
    */
  carregarObjetoColuna(row: any, col: any): any {
    const nestedProperties: string[] = col.field.split('.');
    let value: any = row;
    for (const prop of nestedProperties) {
      value = value[prop];
    }
    return value;
  }

  /**
  * carrega os valores do filtro
  */
  carregarFiltro() {
    let mesFiltrado = this.filtrarMesAtual();
    let anoFiltrado = this.filtrarAnoAtual()
    this.mesFiltro = mesFiltrado
    this.anoFiltro = anoFiltrado
    this.contaFiltro = this.contas[0]
    this.transacoesPorAnoMes()
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
    this.contaFiltro = this.contas[0]
    this.filtroForm.value.ano = this.anoFiltro
    this.filtroForm.value.mes = this.mesFiltro
    this.transacoesPorAnoMes()
  }



  filtrarMesAtual() {
    return this.meses.filter(mes => mes.codigo === new Date().getMonth())[0]
  }

  filtrarAnoAtual() {
    return this.anos.filter(ano => ano.codigo === new Date().getFullYear())[0]
  }

  /**
  * fecha dialogo do componente dialog-mensage
  */
  fecharDialogoItem(display) {
    this.display = display
  }

  /**
* preparar insersão do extrato
*/
  prepararIncersaoExtrato() {
    this.headerModalExtrato = "Carregar Extrato"
    this.displayDialogExtrato = true
  }

  carregarExtrato(event) {
    const arquivo = event.target.files[0]
    let formData = new FormData()
    formData.append('arquivo', arquivo);
    this.transacaoService.enviarArquivo(formData).pipe(
      take(1)).subscribe((teste) => {
        this.teste = teste
        console.log(this.teste.message)
        this.toasty.add({ severity: 'info', summary: 'Informação', detail: `${this.teste.message}` });
      },
        err => {
          this.errorService.handle(err)
        }, () => {
          this.toasty.add({ severity: 'success', summary: 'Sucesso', detail: `Extrato Carregado` });
        })
    formData.delete('arquivo')
    this.displayDialogExtrato = false
    this.extratoForm.reset()
    this.transacoesPorAnoMes()
  }

}
