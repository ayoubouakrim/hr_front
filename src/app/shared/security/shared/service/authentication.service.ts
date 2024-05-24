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

  findEmploye() {
    const username = localStorage.getItem('username') as string;
    const subscription = this.employeUserService.findByUserUsername(username).subscribe({
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
    const username = localStorage.getItem('username') as string;
    const subscription = this.employeService.findByUserUsername(username).subscribe({
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
