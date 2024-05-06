import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {LoginRequest} from "../model/login-request.model";
import {Observable} from "rxjs";
import {AuthenticationResponse} from "../model/authentication-response.model";

@Injectable({ providedIn: 'root' })
export class AuthenticationService{
  private _loginRequest = new LoginRequest();
  readonly url = "http://localhost:8037/api/v1/login"

  constructor(private http: HttpClient) {
  }
  get loginRequest(): LoginRequest {
    if(this._loginRequest==null){
      this._loginRequest = new LoginRequest();
    }
    return this._loginRequest;
  }

  set loginRequest(value: LoginRequest) {
    this._loginRequest = value;
  }

  public login():Observable<HttpResponse<AuthenticationResponse>>{
    return this.http.post<AuthenticationResponse>(this.url, this._loginRequest, {observe: 'response'});
  }
}
