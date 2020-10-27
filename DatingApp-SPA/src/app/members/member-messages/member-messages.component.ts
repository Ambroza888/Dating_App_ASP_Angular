import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { AuthService } from 'src/app/_service/Auth.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];

  constructor(private userService: UserService,
              private authService: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.userService.getMessagesThread(this.authService.decodedToken.nameid, this.recipientId).subscribe(messages => {
      this.messages = messages;
    }, error => {
      this.alertify.error(error);
    });
  }

}
