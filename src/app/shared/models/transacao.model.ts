import { Conta } from './conta.model';
import { Categoria } from './categoria.model';
import { BaseResourceModel } from './base-resource.model';
export class Transacao extends BaseResourceModel {
    codigo: string
    conta: Conta
    tipo: string
    mes: number
    ano: number
    data: Date = new Date
    categoria: Categoria
    isAtivo: boolean
    valor: number
    descricao: string
}