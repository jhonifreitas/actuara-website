import { NgModule } from '@angular/core';

// MATERIAL
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';

// TRANSLATE
import { translateMatPaginator } from 'src/app/services/localization.service';

const MaterialModules = [
  MatCardModule,
  MatIconModule,
  MatSortModule,
  MatListModule,
  MatTableModule,
  DragDropModule,
  MatInputModule,
  MatChipsModule,
  MatButtonModule,
  MatDialogModule,
  MatSelectModule,
  MatRippleModule,
  MatDividerModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatSlideToggleModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
];

@NgModule({
  imports: MaterialModules,
  exports: MaterialModules,
  providers: [
    { provide: MatPaginatorIntl, useValue: translateMatPaginator() }
  ]
})
export class MaterialModule { }
