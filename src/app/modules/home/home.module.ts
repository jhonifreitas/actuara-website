import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// MODULE
import { MatRadioModule } from '@angular/material/radio';
import { SharedModule } from 'src/app/shared/shared.module';

// COMPONENT
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    MatRadioModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
