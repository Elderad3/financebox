import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class FormMessageService {
  required = 'Este campo é obrigatório!';
  padrao = 'O valor de entrada não corresponde ao padrão requerido!';
  email = 'Email inválido!';
  min1 = 'Comprimento mínimo de 1 caractere!';
  min2 = 'Comprimento mínimo de 2 caracteres!';
  min3 = 'Comprimento mínimo de 3 caracteres!';
  min4 = 'Comprimento mínimo de 4 caracteres!';
  min5 = 'Comprimento mínimo de 5 caracteres!';
  min6 = 'Comprimento mínimo de 6 caracteres!';
  max150 = 'Comprimento máximo é de 150 caracteres!';
  minNumber = 'O valor mínimo é {0}!';
  maxNumber = 'Valor máximo é {0}!';
  noEmpty = 'Apenas espaços em branco não são permitidos!';
  rangeLength = 'A entrada deve estar entre {0} e {1} símbolos longos!';
  range = 'A entrada deve estar entre {0} e {1}!';
  number = 'A entrada deve ser um número!';
  igual = 'A entrada deve ser igual a {0}!';
  url = "A entrada deve ser uma URL válido!";
  date = 'A entrada deve ser uma data válida!';
  areEqual = 'Os valores de entrada no grupo devem corresponder!';
  senhas = 'Ambos os campos "Senha" e "Confirmar senha" devem corresponder!';
  unknownError = 'Erro desconhecido!';
  numero = 'Somente Número';
  minMoney = 'O valor mínimo deve ser maior que R$ 0,01'
  constructor() { }
}