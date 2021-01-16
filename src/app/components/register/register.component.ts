import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  registerForm = this.fb.group({
    username: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    password1: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private utilsService: UtilsService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.validateForm()) {
      let user: User = {
        id: null,
        firstName: this.registerForm.controls['firstName'].value,
        lastName: this.registerForm.controls['lastName'].value,
        username: this.registerForm.controls['username'].value.toUpperCase(),
        email: this.registerForm.controls['emailAddress'].value,
        password: this.registerForm.controls['password1'].value
      }

      this.authService.register(user).subscribe(res => {
        console.log(res);
        this.utilsService.openSuccesSnackBar("You have successfully registered!")
        this.router.navigateByUrl('/login')
      }, err => {
        this.utilsService.openFailSnackBar(err.error)
      })
      
    }
  }

  validateForm(): Boolean {
    if (this.registerForm.controls['password1'].value !== this.registerForm.controls['password2'].value) {
      this.utilsService.openFailSnackBar("The passwords do not match!")
      return false
    }
    return true
  }
}
