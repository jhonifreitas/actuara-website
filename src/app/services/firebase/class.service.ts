import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Class } from 'src/app/models/class';
import { FirebaseAbstract } from './abstract';

@Injectable({
  providedIn: 'root'
})
export class ClassService extends FirebaseAbstract<Class> {

  static collectionName = 'classes';

  constructor(
    protected db: AngularFirestore
  ) {
    super(db, ClassService.collectionName);
  }
}
