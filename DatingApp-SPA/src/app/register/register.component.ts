import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_service/Auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelFromRegister = new EventEmitter();
  model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      console.log('reg successfull');
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.cancelFromRegister.emit(false);
    console.log('cancelled');
  }

}
