import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL
import { MaterialModule } from './material.module';

// FLEX LAYOUT
import { FlexLayoutModule } from '@angular/flex-layout';

// WIDGET
import { CardComponent } from './widgets/card/card.component';

// COMPONENT
import { InputFormModule } from './components/input-form/input-form.module';

@NgModule({
  declarations: [
    CardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [
    CardComponent,
    MaterialModule,
    InputFormModule,
    FlexLayoutModule,
  ]
})
export class SharedModule { }
