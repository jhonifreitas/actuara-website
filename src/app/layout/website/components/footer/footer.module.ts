import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL
import { MatDividerModule } from '@angular/material/divider';

// COMPONENT
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    MatDividerModule,
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
