import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

interface CNPJ {
  numero_de_inscricao: string;
  tipo: string;
  abertura: string;
  nome: string;
  fantasia: string;
  atividade_principal: {
    code: string;
    text: string
  };
  atividades_secundarias: {
    code: string;
    text: string
  }[];
  natureza_juridica: string;
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
  bairro: string;
  municipio: string;
  uf: string;
  email: string;
  telefone: string;
  entidade_federativo_responsavel: string;
  situacao: string;
  dt_situacao_cadastral: string;
  situacao_especial: string;
  data_situacao_especial: string;
  capital_social: string;
  quadro_socios: string[];
}

@Injectable({
  providedIn: 'root'
})
export class HubDevService {

  constructor(
    private _api: ApiService
  ) { }

  async getCNPJ(cnpj: string): Promise<CNPJ> {
    return this._api.get(`hub-dev/cnpj`, {cnpj}).then(res => res.result);
  }
}
