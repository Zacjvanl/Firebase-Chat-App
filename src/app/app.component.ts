import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';
import { ChatService } from './chat.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  user: Observable<any>;
  items: Observable<any[]>;
  msgVal: string = '';
  LoggedIn : Boolean = false;
  contentPlaceHolder? : ElementRef;
  @ViewChild('cont') set content(content : ElementRef) {
    this.contentPlaceHolder = content
    this.scrollElement()
  }

  constructor(private loginService : LoginService, private chatService : ChatService) {
    this.items = this.chatService.itemsRef.valueChanges()
    .map(messages => {
      messages.map(m => {
        m.info = this.chatService.af.list('presence/' + m.uid,
                  ref => { return ref.limitToFirst(1)}).valueChanges();
      });
      return messages;
    });
    this.items.delay(50).subscribe(run => {
      this.scrollElement();
    });
  }
  
  ngOnInit() {
    this.user = this.loginService.user;
  }

  logout() {
    this.loginService.logout();
  }

  login() {
    this.loginService.login();
  }

public scrollElement() {
  if(this.contentPlaceHolder) {
    this.contentPlaceHolder.nativeElement.scrollTo(0, this.contentPlaceHolder.nativeElement.scrollHeight);
  }
  else {
    console.log("ERR: Item Container isn't loaded.")
  }
  }

  Send(msg : string){
    this.chatService.Send(msg);
  }
}
