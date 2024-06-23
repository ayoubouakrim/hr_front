import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService, SharedModule} from "primeng/api";
import {User} from "../../../../../shared/security/shared/model/user.model";
import {UserService} from "../../../../../shared/security/shared/service/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";
import {PasswordEmailChange} from "../../../../../shared/security/shared/model/password-email-change.model";

@Component({
  selector: 'app-admin-edit',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    MessagesModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './admin-edit.component.html',
  styleUrl: './admin-edit.component.css'
})
export class AdminEditComponent {
  passwordSaisie: string = '';
  item1 : PasswordEmailChange = new PasswordEmailChange();

  constructor(private userService: UserService, private messageService: MessageService) {
  }

  public update(): void {
    this.item1.id = this.item.id;
    this.item1.username = this.item.username;
    this.item1.password = this.passwordSaisie;
    this.item1.email = this.item.email;
    this.userService.updatePasswordAndEmail(this.item1).subscribe(data => {
      this.messageService.add({
          severity:'success',
          summary:'Succès',
          detail:'les informations a été édité avec succès'});

    }, (error: HttpErrorResponse) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: `Une erreur est survenue`
      });
    });
    localStorage.removeItem('username');
    localStorage.setItem('username', this.item1.username);
    this.editDialog = false;
  }
  get item(): User {
    return this.userService.item;
  }

  set item(value: User) {
    this.userService.item = value;
  }



  get editDialog(): boolean {
    return this.userService.editDialog;
  }

  set editDialog(value: boolean) {
    this.userService.editDialog = value;
  }

  hideCreateDialog() {
    this.editDialog = false;
  }
}
