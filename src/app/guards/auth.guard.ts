import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';

import { StorageService } from 'src/app/services/storage.service';
import { CompanyService } from 'src/app/services/firebase/company.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private _company: CompanyService,
    private _storage: StorageService,
  ){ }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(async fbUser => {
        if (fbUser) {
          const company = await this._company.getById(fbUser.uid);
          if (company) {
            this._storage.setUser(company);
            resolve(true);
          } else this.auth.signOut();
        } else {
          this.router.navigateByUrl('/auth/entrar');
          this._storage.removeUser();
          resolve(false);
        }
      });
    });
  }
}
