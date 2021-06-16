import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { SubClass } from 'src/app/models/class';
import { FirebaseAbstract, FirebaseWhere } from './abstract';

@Injectable({
  providedIn: 'root'
})
export class SubClassService extends FirebaseAbstract<SubClass> {

  static collectionName = 'subclasses';

  constructor(
    protected db: AngularFirestore
  ) {
    super(db, SubClassService.collectionName);
  }

  getByClassId(classId: string) {
    return this.getWhere('classId', '==', classId);
  }

  getByClassIdByType(classId: string, type: 'notRequired' | 'required' | 'depend') {
    const where = [
      new FirebaseWhere('type', '==', type),
      new FirebaseWhere('classId', '==', classId),
    ];
    return this.getWhereMany(where, undefined, undefined, 1);
  }
}
