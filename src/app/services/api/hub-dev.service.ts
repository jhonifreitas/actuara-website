import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { Company } from 'src/app/interfaces/hub-dev';

@Injectable({
  providedIn: 'root'
})
export class HubDevService {

  constructor(
    private _api: ApiService
  ) { }

  async getCNPJ(cnpj: string): Promise<Company> {
    return this._api.get(`hub-dev/cnpj`, {cnpj}).then(res => res.result);
  }
}
