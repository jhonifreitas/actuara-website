import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseErrorCodeMessages } from 'src/app/exceptions/authentication-error';

import { Company } from 'src/app/models/company';
import { CompanyService } from './company.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private _company: CompanyService,
  ) { }

  signIn(email: string, password: string): Promise<Company> {
    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password).then(credential => {
        if (credential.user)
          this._company.getById(credential.user.uid).then(user => {
            resolve(user);
          }).catch(_ => {
            this.signOut();
            reject('Usuário não encontrado!');
          });
        else reject('Usuário não encontrado!');
      }).catch(err => reject(FirebaseErrorCodeMessages.auth[err.code] || 'Houve um erro ao realizar o login. Por favor, tente novamente.'));
    });
  }

  signOut(): Promise<void> {
    return this.auth.signOut();
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    return this.auth.sendPasswordResetEmail(email).catch(err =>
      Promise.reject(FirebaseErrorCodeMessages.auth[err.code] || 'Houve um erro ao redefinir a senha. Por favor, tente novamente.')
    );
  }

  async verifyPasswordResetCode(code: string): Promise<string> {
    return this.auth.verifyPasswordResetCode(code);
  }

  async confirmPasswordReset(code: string, newPassword: string): Promise<void> {
    return this.auth.confirmPasswordReset(code, newPassword);
  }
}
