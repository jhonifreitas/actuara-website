import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// FLEX LAYOUT
import { FlexLayoutModule } from '@angular/flex-layout';

// MATERIAL
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

// COMPONENT
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    RouterModule,
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatToolbarModule,
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
