import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm = this.fb.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private utilsService: UtilsService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  onSubmit() {
    let user: UserLogin = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    }

    this.authService.login(user).subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this.router.navigateByUrl('/dashboard')
      },
      err => {
        this.utilsService.openFailSnackBar(err.error)
      }
    )
  }
}
