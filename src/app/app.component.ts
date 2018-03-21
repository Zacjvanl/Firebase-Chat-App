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
  @ViewChild('cont') cont : ElementRef;

  constructor(private userSession : LoginService, private chatService : ChatService) {
    this.items = this.chatService.itemsRef.valueChanges();
    this.items.delay(50).subscribe(run => {
      this.scrollElement();
    });
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
    this.cont.nativeElement.scrollTo(0, this.cont.nativeElement.scrollHeight);
  }

  Send(msg : string){
    this.chatService.Send(msg);
  }
}
