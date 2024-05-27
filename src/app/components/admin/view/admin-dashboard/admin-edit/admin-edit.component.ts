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

  constructor(private userService: UserService, private messageService: MessageService) {
  }

  public update(): void {
    this.item.password = this.passwordSaisie;
    this.userService.update().subscribe(data => {
      if (data != null) {
        this.messageService.add({
          severity:'success',
          summary:'Succès',
          detail:'les informations a été édité avec succès'});
      } else {
        this.messageService.add({
          severity:'error',
          summary:'échec',
          detail:'les informations n\'a pas été édité'});
      }
    }, (error: HttpErrorResponse) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: `Une erreur est survenue`
      });
    });
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
