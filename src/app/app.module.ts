import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AngularFireModule } from 'angularfire2';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from "./login.service";
import { ChatService } from "./chat.service";

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
    CommonModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [LoginService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
