import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {LoginRequest} from "../../shared/security/shared/model/login-request.model";
import {AuthenticationService} from "../../shared/security/shared/service/authentication.service";
import {TokenService} from "../../shared/security/shared/service/token.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {EmployeUserService} from "../../shared/service/user/employe/employe-user.service";
import {EmployeDto} from "../../shared/model/employe/employe.model";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  errorMsg: string = "";
  isUsernameFocused: boolean = false;
  isPasswordFocused: boolean = false;
  isChecked: boolean = false;
  username : string = "";

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService,
    private employeService: EmployeUserService,
  ) {
  }

  login() {
    this.onRememberMeChange();
    this.errorMsg = "";
    this.authService.login().subscribe({
      next: (res) => {
        this.tokenService.token = res.body?.token as string;
        if (res.body?.token != null) {
          if (res.body?.username != null) {
            this.username = res.body?.username;
            localStorage.setItem('username',this.username);
          }
        }
        if (this.tokenService.userRoles.includes("ADMIN")) {
          this.router.navigate(['app/dashboard']);
        } else if (this.tokenService.userRoles.includes("USER")) {
          this.router.navigate(['app-user/dashboard-user']);
        }
      },
      error: (err: any) => {
        console.log(err);
        if (err.status === 401) {
          this.errorMsg = 'Username ou mot de passe incorrect.';
          localStorage.removeItem('token');
        } else {
          this.errorMsg = 'Une erreur s\'est produite. Veuillez réessayer plus tard.';
        }
      }
    });
  }

  onRememberMeChange() {
    if (this.isChecked) {
      const objetJSON = JSON.stringify(this.loginRequest);
      localStorage.setItem("loginRequest", objetJSON);
    } else {
      localStorage.removeItem("loginRequest");
    }
  }

  ngOnInit(): void {
    const objetJSON = localStorage.getItem('loginRequest');
    if (objetJSON !== null) {
      this.loginRequest = JSON.parse(objetJSON);
    }
  }

  get loginRequest(): LoginRequest {
    return this.authService.loginRequest;
  }

  set loginRequest(value: LoginRequest) {
    this.authService.loginRequest = value;
  }

  set employe(value: EmployeDto) {
    this.employeService.item = value;
  }
}
