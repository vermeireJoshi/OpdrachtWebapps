import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: FormGroup;

  constructor(private authenticationService: AuthenticationService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    /*
    this.user = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]], //, this.serverSideValidateUsername()],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, passwordValidator(12)]],
        confirmPassword: ['', Validators.required]
      }, { validator: comparePasswords }),
      name: ['',Validators.required],
    });*/

    this.user = this.fb.group({
      username: [''],
      passwordGroup: this.fb.group({
        password: [''],
        confirmPassword: ['']
      }),
    });
  }

  onSubmit() {
    console.log(this.user);
    this.authenticationService.register(this.user.value.username, this.user.value.passwordGroup.password).subscribe(item => {
      console.log(item);
    });
  }
}

function passwordValidator(length: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return control.value.length < length ? { 'passwordTooShort': { requiredLength: length, actualLength: control.value.length } } : null;
  };
}

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value ? null : { 'passwordsDiffer': true };
}
