import { Grupo } from './grupo.model';
import { BaseResourceModel } from './base-resource.model';

export class Categoria extends BaseResourceModel {
    image?: string
    nome?: string;
    grupo?: Grupo
    classe?: string
    cor?: string
}