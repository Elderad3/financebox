import { Banco } from './../../../shared/models/banco.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';

import { Conta } from './../../../shared/models/conta.model';
import { ErrorService } from './../../../shared/services/error.service';
import { ContaService } from './../conta.service';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-conta-main',
  templateUrl: './conta-main.component.html'
})
export class ContaMainComponent implements OnInit {

  contas: Conta[];
  bancos: Banco[] = []
  bancosSelecao: SelectItem[] = []
  cols: any[];
  contaSelecionada: Conta;
  display: boolean = false

  msgContent: string
  titulo: string = 'Contas'
  msgs: string

  @ViewChild("contaForm", { static: false })
  contaForm: NgForm
  conta: Conta
  displayDialog: boolean = false
  headerModal: string = ''

  constructor(
    private contaService: ContaService,
    private errorService: ErrorService,
    private confirmationService: ConfirmationService,
    private toasty: MessageService) { }

  ngOnInit() {
    this.conta = new Conta
    this.cols = [
      { field: 'banco.nome', header: 'Banco' },
      { field: 'agencia', header: 'Agência' },
      { field: 'numeroConta', header: 'Conta' }
    ];
    this.listarContas()
    this.listarBancos()
  }

  /**
 * Lista todas as propriedades existentes
 */
  listarContas() {
    this.contaService.listar().pipe(
      take(1)
    ).subscribe((contas) => {
      this.contas = contas;
    }, err => {
      this.errorService.handle(err)
    })
  }


  /**
* Exibe a confirmação de exclusão, se sim, exclui
*/
  excluirConta(conta: Conta) {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir?',
      accept: () => {
        this.excluir(conta._id);
      }
    })
  }
  /**
  * Envia comando para o service para remover uma propriedade
  * @param id 
  */
  excluir(id: number) {
    this.contaService.excluir(id).pipe(
      take(1))
      .subscribe(() => {
        this.toasty.add({ severity: 'success', summary: 'Sucesso', detail: `Exclusão Realizada` });
        this.listarContas();
      })

  }

  /**
  * preparar insersão de item na lista de item
  */
  prepararIncersaoItem() {
    this.conta = new Conta
    this.contaForm.reset()
    this.headerModal = "Inserir Conta"
    this.displayDialog = true
  }


  /**
  * Envia para o service para realizar o salvamento ou atualização da entidade
  */
  salvarConta() {
    this.contaService.salvar(this.conta).pipe(
      take(1),
    ).subscribe(() => {
      this.toasty.add({ severity: 'success', summary: 'Sucesso', detail: `A conta de número ${this.conta.numeroConta} foi salva` });
      this.listarContas()
      this.contaSelecionada = null
      this.displayDialog = false
    }, err => {
      this.errorService.handle(err)
    })

  }

  /**
  * edita item selecionaado da listagem
  */
  editarConta(conta: Conta) {
    this.conta = { ...conta };
    this.headerModal = "Editar Conta"
    this.displayDialog = true
  }

  /**
  * cancela inserção ou edição no dialog
  */
  cancelar() {
    this.contaForm.reset()
    this.displayDialog = false
  }

  validarContaExistente() {
    let existeConta = false
    if (!this.conta._id) {
      this.contas.forEach(conta => {
        if (conta.numeroConta === this.conta.numeroConta) {
          existeConta = true
        }
      })
    }
    if (existeConta) {
      this.toasty.add({ severity: 'error', summary: 'Erro', detail: `Já existe uma conta com este número` })
    } else {
      this.salvarConta()
    }
  }

  listarBancos() {
    this.contaService.listarBancos().pipe(
      take(1)
    ).subscribe((bancos) => {
      this.bancos = bancos
      this.bancos.forEach(banco => {
        this.bancosSelecao.push({ label: banco.nome, value: banco })
      })
    }, err => {
      this.errorService.handle(err)
    })
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
* fecha dialogo do componente dialog-mensage
*/
  fecharDialogoItem(display) {
    this.display = display
  }

}
