import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {PasswordResetRequest} from "../model/password-reset-request.model";

@Injectable({
  providedIn: 'root'
})
export class PasswordResetRequestService {
  private _passwordResetRequest = new PasswordResetRequest();
  readonly url = "http://localhost:8037/api/v1/passwordReset/email"

  constructor(private http: HttpClient) {
  }

  public resetRequest():void{
    this.http.post<void>(this.url, this._passwordResetRequest, {observe: 'response'})
      .subscribe(response => {
        console.log("Réponse:", response);
        // Traitez la réponse ici
      }, error => {
        console.error("Erreur:", error);
        // Traitez les erreurs ici
      });
  }

  get passwordResetRequest(): PasswordResetRequest {
    if(this._passwordResetRequest==null){
      this._passwordResetRequest = new PasswordResetRequest();
    }
    return this._passwordResetRequest;
  }

  set passwordResetRequest(value: PasswordResetRequest) {
    this._passwordResetRequest = value;
  }
}
