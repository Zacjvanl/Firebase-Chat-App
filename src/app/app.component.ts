import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { User } from "../Auth/Auth.component";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  user: Observable<firebase.User>;
  userInfo = new User();
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  msgVal: string = '';
  @ViewChild('cont') cont : ElementRef;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.itemsRef = af.list('/messages', ref => {
      return ref.limitToLast(50)
    });

    this.items = this.itemsRef.valueChanges();
    this.items.delay(50).subscribe(test => {
      this.scrollElement();
    })

    this.user = this.afAuth.authState;
    this.user.subscribe(info => {
      if(info){
        this.userInfo.displayName = info.displayName; 
        this.userInfo.email = info.email;
        this.userInfo.photoURL = info.providerData[0].photoURL;
      }
    })
  }

login() {
  this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
}

logout() {
  this.afAuth.auth.signOut();
}

public scrollElement() {
  this.cont.nativeElement.scrollTo(0, this.cont.nativeElement.scrollHeight);
}

Send(desc: string) {
  this.itemsRef.push({ message: desc, 
    from: this.userInfo.displayName, 
    photo: this.userInfo.photoURL,
    email: this.userInfo.email });
  this.msgVal = '';
}
}
