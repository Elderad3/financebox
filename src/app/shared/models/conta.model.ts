import { Banco } from './banco.model';

import { BaseResourceModel } from './base-resource.model';
export class Conta extends BaseResourceModel {
    banco: Banco
    agencia: string
    numeroConta: string
}

