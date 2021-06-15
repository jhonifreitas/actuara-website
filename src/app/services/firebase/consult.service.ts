import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { FirebaseAbstract } from './abstract';
import { Consult } from 'src/app/models/consult';

@Injectable({
  providedIn: 'root'
})
export class ConsultService extends FirebaseAbstract<Consult> {

  static collectionName = 'consults';

  constructor(
    protected db: AngularFirestore
  ) {
    super(db, ConsultService.collectionName);
  }

  async update(id: string, data: Partial<Consult>) {
    if (data.quantity) data.quantity = data.quantity + 1; 
    return super.update(id, data);
  }

  async getByCNPJ(cnpj: string) {
    return this.getWhere('result.numero_de_inscricao', '==', cnpj, 'createdAt', 'desc', 1)
      .then(docs => docs.length ? docs[0] : Promise.reject('Not Found!'));
  }
}
