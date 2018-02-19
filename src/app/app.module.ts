import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AngularFireModule } from 'angularfire2';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyAcHlUcEVrL5VsHjHB6ppr-t5Lown2enEo",
  authDomain: "fir-chatapp-e70c2.firebaseapp.com",
  databaseURL: "https://fir-chatapp-e70c2.firebaseio.com",
  projectId: "fir-chatapp-e70c2",
  storageBucket: "fir-chatapp-e70c2.appspot.com",
  messagingSenderId: "679857433814"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
