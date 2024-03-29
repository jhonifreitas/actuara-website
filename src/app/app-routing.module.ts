import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './modules/home/home.component';
import { LayoutComponent } from './layout/website/layout.component';
import { MultiCompanyComponent } from './modules/multi-company/multi-company.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },

  { path: '', redirectTo: 'consulta', pathMatch: 'full' },
  { path: '', component: LayoutComponent, canActivate: [AuthGuard], children: [
    { path: 'consulta', component: HomeComponent },
    { path: 'multi-consulta', component: MultiCompanyComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
