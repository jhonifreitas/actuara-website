import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { FirebaseAbstract } from './abstract';
import { ApiService } from '../api/api.service';
import { Company } from 'src/app/models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends FirebaseAbstract<Company> {

  static collectionName = 'companies';

  constructor(
    private api: ApiService,
    protected db: AngularFirestore
  ) {
    super(db, CompanyService.collectionName);
  }

  async add(data: Company): Promise<string> {
    return this.api.post('company', data).then(res => res.company.id);
  }

  async update(id: string, data: Partial<Company>): Promise<void> {
    return this.api.put(`company/${id}`, data);
  }
}
