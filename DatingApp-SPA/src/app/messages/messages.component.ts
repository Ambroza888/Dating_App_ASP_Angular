import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../_models/message';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { AlertifyService } from '../_service/alertify.service';
import { AuthService } from '../_service/Auth.service';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private alertify: AlertifyService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.userService.getMessagesForUser(
      this.authService.decodedToken.nameid,
      this.pagination.currentPage,
      this.pagination.itemsPerPage,
      this.messageContainer)
        .subscribe((res: PaginatedResult<Message[]>) => {
        this.messages = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  deleteMessage(messageId: number) {
    this.alertify.confirm('Are you sure you want to delete the message ?', () => {
      this.userService.deleteMessage(messageId, this.authService.decodedToken.nameid).subscribe(() => {
      this.messages.splice(this.messages.findIndex(m => m.id === messageId), 1);
      this.alertify.success('Message has been deleted');
      }, error => {
        this.alertify.error('Failed to delete message');
      });
    });
  }

}
