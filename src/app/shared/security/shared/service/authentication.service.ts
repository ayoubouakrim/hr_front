import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {LoginRequest} from "../model/login-request.model";
import {Observable} from "rxjs";
import {AuthenticationResponse} from "../model/authentication-response.model";
import {EmployeUserService} from "../../../service/user/employe/employe-user.service";
import {EmployeService} from "../../../service/admin/employe/employe.service";

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private _loginRequest = new LoginRequest();
  readonly url = "http://localhost:8089/api/v1/login"

  private _user: string = "";
  private matricule: string = "";


  constructor(private http: HttpClient, private employeUserService: EmployeUserService, private employeService: EmployeService) {
  }

  get loginRequest(): LoginRequest {
    if (this._loginRequest == null) {
      this._loginRequest = new LoginRequest();
    }
    return this._loginRequest;
  }

  set loginRequest(value: LoginRequest) {
    this._loginRequest = value;
  }

  public login(): Observable<HttpResponse<AuthenticationResponse>> {
    return  this.http.post<AuthenticationResponse>(this.url, this._loginRequest, {observe: 'response'});
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get user(): string {
    return this._user;
  }

  set user(value: string) {
    this._user = value;
  }

  findEmploye() {
    const subscription = this.employeUserService.findByUserUsername(this.user).subscribe({
      next: (res) => {
        this.matricule = res.matricule as string;
        localStorage.setItem('matricule', this.matricule);
      },
      error: (error) => {
        console.error("Erreur lors de la recherche de l'employé : ", error);
      }
    });
  }
  findAdmin() {
    console.log("ffffff" + this.user);
    const subscription = this.employeService.findByUserUsername(this.user).subscribe({
      next: (res) => {
        this.matricule = res.matricule as string;
        localStorage.setItem('matricule', this.matricule);
      },
      error: (error) => {
        console.error("Erreur lors de la recherche de l'employé : ", error);
      }
    });
  }
}
