import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  user: Observable<any>;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  msgVal: string = '';
  contentPlaceHolder? : ElementRef;
  @ViewChild('cont') set content(content : ElementRef) {
    this.contentPlaceHolder = content
    this.scrollElement()
  }

  constructor(public af: AngularFireDatabase, private userSession : LoginService) {
    this.itemsRef = af.list('/messages', ref => {
      return ref.limitToLast(50)
    });

    this.items = this.itemsRef.valueChanges();
    this.items.delay(50).subscribe(test => {
      this.scrollElement();
    })
  }
  
  ngOnInit() {
    this.user = this.userSession.user;
  }

  logout() {
    this.userSession.logout();
  }

  login() {
    this.userSession.login();
  }

public scrollElement() {
  if(this.contentPlaceHolder) {
    this.contentPlaceHolder.nativeElement.scrollTo(0, this.contentPlaceHolder.nativeElement.scrollHeight);
  }
  else {
    console.log("ERR: Item Container isn't loaded.")
  }
  }

Send(desc: string) {
  this.itemsRef.push({ message: desc, 
    from: this.userSession.userInfo.displayName, 
    photo: this.userSession.userInfo.photoURL,
    email: this.userSession.userInfo.email });
  this.msgVal = '';
}
}
