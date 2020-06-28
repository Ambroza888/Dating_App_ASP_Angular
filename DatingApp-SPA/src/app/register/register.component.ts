import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_service/Auth.service';
import { AlertifyService } from '../_service/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelFromRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;


  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {

  this.registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.minLength(4), Validators.maxLength(8), Validators.required]),
    confirmPassword: new FormControl('', Validators.required)
  }, this.passwordMatchValidator);

  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }

  register() {
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertify.success('reg successfull');
    // }, error => {
    //   this.alertify.error(error);
    // });
    console.log(this.registerForm.value);
  }
  cancel() {
    this.cancelFromRegister.emit(false);
    console.log('cancelled');
  }

}
