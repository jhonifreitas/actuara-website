import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class HubDevService {

  constructor(
    private api: ApiService
  ) { }

  async getCNPJ(cnpj: string) {
    return this.api.get('hub-dev/cnpj', {cnpj}).then(res => res.result);
  }
}
