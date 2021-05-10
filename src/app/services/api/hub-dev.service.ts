import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

interface CNPJ {
  numero_de_inscricao: string,
  tipo: string,
  abertura: string,
  nome: string,
  fantasia: string,
  atividade_principal: {
    code: string,
    text: string
  },
  atividades_secundarias: { 
    code: string,
    text: string
  }[],
  natureza_juridica: string,
  logradouro: string,
  numero: string,
  complemento: string,
  cep: string,
  bairro: string,
  municipio: string,
  uf: string,
  email: string,
  telefone: string,
  entidade_federativo_responsavel: string,
  situacao: string,
  dt_situacao_cadastral: string,
  situacao_especial: string,
  data_situacao_especial: string,
  capital_social: string,
  quadro_socios: string[]
}

@Injectable({
  providedIn: 'root'
})
export class HubDevService {

  private host = environment.hubDev.host;
  private token = environment.hubDev.token;

  constructor(
    private http: HttpClient
  ) { }

  private get headers() {
    return new HttpHeaders({'Content-Type': 'application/json'});
  }

  async getCNPJ(cnpj: string): Promise<CNPJ> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.host}cnpj?cnpj=${cnpj}&token=${this.token}`, {headers: this.headers})
        .subscribe((res: any) => resolve(res.result), err => reject(err));
    });
  }
}
