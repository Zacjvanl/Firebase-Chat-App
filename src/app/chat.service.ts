import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable()
export class ChatService {
  itemsRef: AngularFireList<any>;
  msgVal: string = '';

  constructor(public af: AngularFireDatabase, public userSession : LoginService) {
    this.itemsRef = af.list('/messages', ref => {
      return ref.limitToLast(50);
    })
 }

 Send(desc: string) {
  this.itemsRef.push({ message: desc, 
    from: this.userSession.userInfo.displayName, 
    photo: this.userSession.userInfo.photoURL,
    email: this.userSession.userInfo.email,
    uid: this.userSession.userInfo.uid });
  this.msgVal = '';
}

}
