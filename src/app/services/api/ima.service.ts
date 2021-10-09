import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { License } from 'src/app/interfaces/ima';

@Injectable({
  providedIn: 'root'
})
export class IMAService {

  constructor(
    private _api: ApiService
  ) { }

  async getLicense(cnpj: string): Promise<License[]> {
    return this._api.get(`ima/${cnpj}/license`).then(res => res.result).catch(_ => []);
  }
}
