import { Grupo } from './../../../shared/models/grupo.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';

import { Categoria } from './../../../shared/models/categoria.model';
import { ErrorService } from './../../../shared/services/error.service';
import { CategoriaService } from './../categoria.service';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-categoria-main',
  templateUrl: './categoria-main.component.html',
  styleUrls: ['./categoria-main.component.css']
})
export class CategoriaMainComponent implements OnInit {

  categorias: Categoria[];
  grupos: Grupo[] = []
  cols: any[];
  categoriaSelecionada: Categoria;
  titulo: string = 'Categorias'

  @ViewChild("categoriaForm", { static: false })
  categoriaForm: NgForm
  categoria: Categoria
  displayDialog: boolean = false
  headerModal: string = ''

  constructor(
    private categoriaService: CategoriaService,
    private errorService: ErrorService,
    private confirmationService: ConfirmationService,
    private toasty: MessageService) { }

  ngOnInit() {
    this.categoria = new Categoria
    this.cols = [
      { field: 'nome', header: 'Nome' },
      { field: 'grupo.nome', header: 'Grupo' },
    ];
    this.listar()
    this.listarGrupos()
  }

  /**
 * Lista todas as propriedades existentes
 */
  listar() {
    this.categoriaService.listar().pipe(
      take(1)
    ).subscribe((categorias) => {
      this.categorias = categorias;
    }, err => {
      this.errorService.handle(err)
    })
  }


  /**
* Exibe a confirmação de exclusão, se sim, exclui
*/
  excluirCategoria(categoria: Categoria) {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir?',
      accept: () => {
        this.excluir(categoria._id);
      }
    })
  }
  /**
  * Envia comando para o service para remover uma propriedade
  * @param id 
  */
  excluir(id: number) {
    this.categoriaService.excluir(id).pipe(
      take(1))
      .subscribe(() => {
        this.toasty.add({ severity: 'success', summary: 'Sucesso', detail: `Exclusão Realizada` });
        this.listar();
      })

  }

  /**
  * preparar insersão de item na lista de item
  */
  prepararIncersaoItem() {
    this.categoria = new Categoria
    this.categoria = { image: "assets/img/categoria/compras.png", classe: "nao-classificado" }
    this.categoriaForm.reset()
    this.headerModal = "Inserir Categoria"
    this.displayDialog = true
  }


  /**
  * Envia para o service para realizar o salvamento ou atualização da entidade
  */
  salvarCategoria() {
    this.categoriaService.salvar(this.categoria).pipe(
      take(1),
    ).subscribe(() => {
      this.toasty.add({ severity: 'success', summary: 'Sucesso', detail: `A categoria foi salva` });
      this.listar()
      this.categoriaSelecionada = null
      this.displayDialog = false
    }, err => {
      this.errorService.handle(err)
    })

  }

  /**
  * edita item selecionaado da listagem
  */
  editarCategoria(categoria: Categoria) {
    this.categoria = { ...categoria };
    this.headerModal = "Editar Categoria"
    this.displayDialog = true
  }

  /**
  * cancela inserção ou edição no dialog
  */
  cancelar() {
    this.categoriaForm.reset()
    this.displayDialog = false
  }

  validarCategoriaExistente() {
    let existeCategoria = false
    if (!this.categoria._id) {
      this.categorias.forEach(categoria => {
        if (categoria.nome === this.categoria.nome) {
          existeCategoria = true
        }
      })
    }
    if (existeCategoria) {
      this.toasty.add({ severity: 'error', summary: 'Erro', detail: `Já existe uma categoria com este número` })
    } else {
      this.salvarCategoria()
    }
  }

  listarGrupos() {
    this.categoriaService.listarGrupos().pipe(
      take(1)
    ).subscribe((grupos) => {
      this.grupos = grupos
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

}
