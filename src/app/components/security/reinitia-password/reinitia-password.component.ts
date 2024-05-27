import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../../shared/security/shared/service/token.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {PaginatorModule} from "primeng/paginator";
import {SharedModule} from "primeng/api";
import {UserUserService} from "../../../shared/security/shared/service/user-user.service";
import {PasswordEmailChange} from "../../../shared/security/shared/model/password-email-change.model";
import {UserService} from "../../../shared/security/shared/service/user.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-reinitia-password',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    PaginatorModule,
    SharedModule,
    NgIf
  ],
  templateUrl: './reinitia-password.component.html',
  styleUrl: './reinitia-password.component.css'
})
export class ReinitiaPasswordComponent implements OnInit {

  passwordAndEmailChange : PasswordEmailChange
  jwtToken: string = '';
  password: string = '';
  username: string = '';
  idString: string = '';
  idNumber: number = 0;
  errorMsg: string = "";
  viewDialog : boolean = true;

  constructor(private tokenService: TokenService,
              private route: ActivatedRoute,
              private userService: UserUserService,
              private userService1: UserService,
              private router: Router
  ) {
    this.passwordAndEmailChange = new PasswordEmailChange();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.jwtToken = params['token'];
      this.username = params['username'];
      this.idString = params['id'];
      this.idNumber = parseInt(this.idString);
      this.tokenService.token = this.jwtToken as string;
      localStorage.setItem('username',this.username);
    });
  }

  update() {
    this.errorMsg = "";
    if(this.passwordAndEmailChange.password == this.password) {
      this.passwordAndEmailChange.id = this.idNumber;
      if (this.tokenService.userRoles.includes("ADMIN")) {
        this.userService1.updatePassword(this.passwordAndEmailChange).subscribe({
          next: (response) => {
            console.log('update succes:', response);
            this.router.navigate(['app/dashboard']);
          },
          error: (err: any) => {
            console.log(err);
            if (err.status === 401) {
              this.errorMsg = '';
            } else {
              this.errorMsg = '';
            }
          }
        });
      } else if (this.tokenService.userRoles.includes("USER")) {
        this.userService.updatePassword(this.passwordAndEmailChange).subscribe({
          next: (response) => {
            console.log('update succes:', response);
            this.router.navigate(['app-user/dashboard-user']);
          },
          error: (err: any) => {
            console.log(err);
            if (err.status === 401) {
              this.errorMsg = '';
            } else {
              this.errorMsg = '';
            }
          }
        });
      }
    }else{
      this.errorMsg = 'La confirmation du mot de passe ne correspond pas.';
    }
  }
}
