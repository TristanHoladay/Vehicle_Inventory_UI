import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { decode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: any;
  loading: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit(loginData) {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(loginData.email, loginData.password)
      .pipe(first())
      .subscribe(
        data => { 
          this.router.navigateByUrl("admin");
        },
        error => {
          console.log(error);
        }
      );
      console.log("logged in!");
      console.log(this.authService.decodeToken());
  }
}
