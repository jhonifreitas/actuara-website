import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL
import { MatDialogModule } from '@angular/material/dialog';

// LOTTIE
import { LottieModule } from 'ngx-lottie';
export function playerFactory(): Promise<any> {
  return import('lottie-web');
}

// COMPONENT
import { LoadingComponent } from './loading.component';

@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    LottieModule.forRoot({player: playerFactory, useCache: true})
  ],
})
export class LoadingModule { }
