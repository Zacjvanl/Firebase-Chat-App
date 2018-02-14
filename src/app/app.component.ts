import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: Observable<firebase.User>;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  msgVal: string = '';

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.itemsRef = af.list('/messages', ref => {
      return ref.limitToLast(50)
    });

    this.items = this.itemsRef.valueChanges();
    this.user = this.afAuth.authState;
  }

login() {
  this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
}

logout() {
  this.afAuth.auth.signOut();
}

Send(desc: string) {
  this.itemsRef.push({ message: desc });
  this.msgVal = '';
}
}
