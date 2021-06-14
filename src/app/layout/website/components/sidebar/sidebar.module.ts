import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// MATERIAL
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';

// COMPONENT
import { SidebarComponent } from './sidebar.component';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    RouterModule,
    CommonModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatExpansionModule,
  ],
  exports: [SidebarComponent]
})
export class SidebarModule { }
