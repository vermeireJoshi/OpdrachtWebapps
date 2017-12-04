/*import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: FormGroup;

  constructor(private authenticationService: AuthenticationService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.user = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)], this.serverSideValidateUsername()],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, passwordValidator(12)]],
        confirmPassword: ['', Validators.required]
      }, { validator: comparePasswords }),
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    this.authenticationService.register(this.user.value.username, this.user.value.passwordGroup.password).subscribe(item => {
      this.router.navigate(['home']);
    });
  }

  serverSideValidateUsername(): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return this.authenticationService.checkUserNameAvailability(control.value).map(available => {
        console.log(available);
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    };
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
*/




import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from '../services/authentication.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, FormControl } from '@angular/forms';

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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  public user: FormGroup;

  get passwordControl(): FormControl {
    return <FormControl>this.user.get('passwordGroup').get('password');
  }

  constructor(private authenticationService: AuthenticationService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.user = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)], this.serverSideValidateUsername()],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, passwordValidator(12)]],
        confirmPassword: ['', Validators.required]
      }, { validator: comparePasswords })
    });
  }

  serverSideValidateUsername(): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return this.authenticationService.checkUserNameAvailability(control.value).map(available => {
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    };
  }

  onSubmit() {
    this.authenticationService.register(this.user.value.username, this.user.value.passwordGroup.password).subscribe(item => {
      this.router.navigate(['home']);
    });
  }

}