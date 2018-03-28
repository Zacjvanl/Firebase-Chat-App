import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { User } from "../Auth/Auth.component";
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';

@Injectable()
export class LoginService {

  user: Observable<firebase.User>;
  LoggedIn: Boolean;
  amOnline? : Observable<any>;
  userRef?: any;
  userInfo = new User();

  constructor(public afAuth: AngularFireAuth, private af: AngularFireDatabase) 
  { 
    this.user = this.afAuth.authState;
    this.amOnline = af.object('.info/connected').valueChanges();
    
  
    this.user.subscribe(info => {
      if(info){
        this.updateOnConnected()
        this.updateOnDisconnected()
        this.userInfo.displayName = info.displayName; 
        this.userInfo.email = info.email;
        this.userInfo.photoURL = info.providerData[0].photoURL;
        this.userInfo.uid = info.uid;
      }
    })
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  
  logout() {
    this.afAuth.auth.signOut();
  }

  private updateStatus(status : string) {
    if (!this.userInfo.uid) return

    this.af.object("/presence/" + this.userInfo.uid).update({status : status})
  }

  private updateOnConnected() {
    return this.amOnline.subscribe(connected => {
      let status = connected ? "online" : "offline"
      this.LoggedIn = connected ? true : false
      this.updateStatus(status)
    })
  }

  private updateOnDisconnected() {
    firebase.database().ref().child("/presence/" + this.userInfo.uid)
                              .onDisconnect()
                              .update({status : "offline"})
  }
}
