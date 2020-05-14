import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_service/user.service';
import { AlertifyService } from '../_service/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_service/Auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private alertify: AlertifyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.GetUser(this.authService.decodedToken.nameid).pipe(
      catchError(error => {
        this.alertify.error(`Problem retrieving Your data and the error is: ${error}`);
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
