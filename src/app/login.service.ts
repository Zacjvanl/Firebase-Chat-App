import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { User } from "../Auth/Auth.component";
import * as firebase from 'firebase/app';

@Injectable()
export class LoginService {

  user: Observable<firebase.User>;
  userInfo = new User();

  constructor(public afAuth: AngularFireAuth) 
  { 
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
}
