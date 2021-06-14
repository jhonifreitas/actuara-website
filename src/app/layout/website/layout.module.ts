import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// MATERIAL
import { MatSidenavModule } from '@angular/material/sidenav';

// MODULE
import { HomeModule } from 'src/app/modules/home/home.module';
import { MultiCompanyModule } from 'src/app/modules/multi-company/multi-company.module';

// DEFAULT
import { LayoutComponent } from './layout.component';
import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';
import { SidebarModule } from './components/sidebar/sidebar.module';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    HomeModule,
    RouterModule,
    CommonModule,
    HeaderModule,
    FooterModule,
    SidebarModule,
    MatSidenavModule,
    MultiCompanyModule,
  ]
})
export class WebsitePanelModule { }
