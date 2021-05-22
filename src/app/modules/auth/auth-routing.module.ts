import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './login/login.component';
import { PasswordResetFormComponent } from './password-reset/password-reset.component';
import { ForgotPasswordFormComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'entrar', pathMatch: 'full' },
  { path: 'entrar', component: LoginFormComponent },
  { path: 'esqueci-senha', component: ForgotPasswordFormComponent },
  { path: 'redefinir-senha', component: PasswordResetFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AuthRoutingModule { }
