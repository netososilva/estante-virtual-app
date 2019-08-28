import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/shared/services/login.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'ev-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private formBuilder: FormBuilder, 
              private loginService: LoginService,
              private notificationService: NotificationService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required])
    })
  }

  login() {
    this.loginService.login(this.loginForm.value.email, 
                            this.loginForm.value.password)
                     .subscribe(user => 
                                  this.notificationService.notify(`Bem vindo ${user.name}`),
                                response => 
                                  this.notificationService.notify(response.message),
                                () => 
                                  this.router.navigate(['/books']))
  }

}
