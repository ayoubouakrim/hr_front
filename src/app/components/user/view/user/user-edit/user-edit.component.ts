import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {User} from "../../../../../shared/security/shared/model/user.model";
import {UserUserService} from "../../../../../shared/security/shared/service/user-user.service";
import {UserService} from "../../../../../shared/security/shared/service/user.service";
import {PasswordEmailChange} from "../../../../../shared/security/shared/model/password-email-change.model";

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  passwordSaisie: string = '';

  constructor(private userService: UserUserService, private userService1: UserService) {
  }

  update(){
    this.item1.id = this.item.id;
    this.item1.username = this.item.username;
    this.item1.password = this.passwordSaisie;
    this.item1.email = this.item.email;
    this.userService.updatePasswordAndEmail(this.item1).subscribe({
      next: (response) => {
        console.log('update succes:', response);
      },
      error: (error) => {
        console.error('update failed:', error);
      }
    });
  }
  get item(): User {
    return this.userService1.item;
  }

  set item(value: User) {
    this.userService1.item = value;
  }

  get item1(): PasswordEmailChange {
    return this.userService.item;
  }

  set item1(value: PasswordEmailChange) {
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
