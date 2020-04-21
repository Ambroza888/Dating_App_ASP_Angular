import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/Auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(private autService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.autService.login(this.model).subscribe(data => {
      console.log('logged in successfully');
    }, error => {
      console.log('fail to login');
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    // if something in token => true if is nothing in token => false;
    return !!token;
  }
  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }
}
