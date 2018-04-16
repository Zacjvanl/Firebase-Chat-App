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
        this.userInfo.displayName = info.displayName; 
        this.userInfo.email = info.email;
        this.userInfo.photoURL = info.providerData[0].photoURL;
        this.userInfo.uid = info.uid;

        this.updateOnConnected()
        this.updateOnDisconnected()
        //This is done because when the user logs out and logs back in
        //there connection to the database is unchanged
        //so you need to manually update their status by making
        //this function call.
        this.updateStatus('online');
      }
      else {
        this.updateStatus('offline');
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
      this.updateStatus(status)
    })
  }

  private updateOnDisconnected() {
    firebase.database().ref().child("/presence/" + this.userInfo.uid)
                              .onDisconnect()
                              .update({status : "offline"})
  }
}
