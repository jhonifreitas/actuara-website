import localePt from '@angular/common/locales/pt';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe, registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// MATERIAL
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// FIREBASE
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// DEFAULT
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { WebsitePanelModule } from './layout/website/layout.module';
import { DeleteModule } from './shared/components/delete/delete.module';
import { LoadingModule } from './shared/components/loading/loading.module';

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  imports: [
    DeleteModule,
    BrowserModule,
    LoadingModule,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    WebsitePanelModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    DatePipe,
    AngularFirestoreModule,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
