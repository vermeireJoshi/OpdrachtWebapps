import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: FormGroup;

  constructor(private authService: AuthenticationService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.user = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authService.login(this.user.value.username, this.user.value.password).subscribe(val => {
      if(val == true) {
        this.router.navigate(["/home"]);
      }
    });
  }
}
