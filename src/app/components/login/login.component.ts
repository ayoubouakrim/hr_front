import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {LoginRequest} from "../../shared/security/shared/model/login-request.model";
import {AuthenticationService} from "../../shared/security/shared/service/authentication.service";
import {TokenService} from "../../shared/security/shared/service/token.service";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMsg: string = "";
  isUsernameFocused: boolean = false;
  isPasswordFocused: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }

  login() {
    this.errorMsg = "";
    this.authService.login().subscribe({
      next: (res) => {
        this.tokenService.token = res.body?.token as string;
        if (this.tokenService.userRoles.includes("ADMIN")) {
          this.router.navigate(['app/dashboard']);
        } else if (this.tokenService.userRoles.includes("USER")) {
          //this.router.navigate(['app/dashboard']);
        }
      },
      error: (err: any) => {
        console.log(err);
        if (err.status === 401) {
          this.errorMsg = 'Username ou mot de passe incorrect.';
        } else {
          this.errorMsg = 'Une erreur s\'est produite. Veuillez réessayer plus tard.';
        }
      }
    });
  }

  get loginRequest(): LoginRequest {
    return this.authService.loginRequest;
  }

  set loginRequest(value: LoginRequest) {
    this.authService.loginRequest = value;
  }
}
