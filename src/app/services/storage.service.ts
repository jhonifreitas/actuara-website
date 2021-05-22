import { Injectable } from '@angular/core';

import { Company } from 'src/app/models/company';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // USER
  async setUser(data: Company): Promise<void> {
    localStorage.setItem('user', JSON.stringify(data));
  }
  get getUser(): Company {
    return JSON.parse(localStorage.getItem('user') || '');
  }
  removeUser(): void {
    localStorage.removeItem('user');
  }
}
