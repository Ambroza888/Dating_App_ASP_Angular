import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_service/user.service';
import { AlertifyService } from '../_service/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/message';
import { AuthService } from '../_service/Auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
  constructor(private userService: UserService,
              private router: Router,
              private alertify: AlertifyService,
              private authService: AuthService) {}

  pageNumber = 1;
  itemsPerPage = 5;
  messageContainer = 'Unread';

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.userService.getMessagesForUser(
      this.authService.decodedToken.nameid,
      this.pageNumber,
      this.itemsPerPage,
      this.messageContainer).pipe(
      catchError(error => {
        this.alertify.error(`Problem retrieving messages and the error is: ${error}`);
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
