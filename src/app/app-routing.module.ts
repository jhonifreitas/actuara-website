import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './modules/home/home.component';
import { LayoutComponent } from './layout/website/layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'consulta', pathMatch: 'full' },
  { path: '', component: LayoutComponent, children: [
    { path: 'consulta', component: HomeComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
