import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// MASK
import { NgxMaskModule } from 'ngx-mask';

// MODULE
import { MatRadioModule } from '@angular/material/radio';
import { SharedModule } from 'src/app/shared/shared.module';

// COMPONENT
import { MultiCompanyComponent } from './multi-company.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    NgxMaskModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
  declarations: [MultiCompanyComponent],
})
export class MultiCompanyModule {}
