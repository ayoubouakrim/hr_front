import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {PasswordResetRequestService} from "../../../shared/security/shared/service/password-reset-request.service";
import {PasswordResetRequest} from "../../../shared/security/shared/model/password-reset-request.model";

@Component({
  selector: 'app-password-reset',
  standalone: true,
    imports: [
        FormsModule,
        NgIf
    ],
  templateUrl: './password-reset-request.component.html',
  styleUrl: './password-reset-request.component.css'
})
export class PasswordResetRequestComponent {
  confMsg: string = "";
  isUsernameFocused: boolean = false;
  isPasswordFocused: boolean = false;
constructor(private passwordService : PasswordResetRequestService) {
}

  resetRequest(){
  this.isPasswordFocused = false;
  if(this.passwordResetRequest.email!="") {
    this.confMsg = "A verification code has been sent to your email address.";
  }
  this.passwordService.resetRequest();
  }
  get passwordResetRequest(): PasswordResetRequest {
    return this.passwordService.passwordResetRequest;
  }

  set passwordResetRequest(value: PasswordResetRequest) {
    this.passwordService.passwordResetRequest = value;
  }

}
