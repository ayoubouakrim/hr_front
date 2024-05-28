import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService, SharedModule} from "primeng/api";
import {UserService} from "../../../../../shared/security/shared/service/user.service";
import {User} from "../../../../../shared/security/shared/model/user.model";
import {RoleService} from "../../../../../shared/security/shared/service/role.service";
import {Role} from "../../../../../shared/security/shared/model/role.model";
import {MultiSelectModule} from "primeng/multiselect";
import {HttpErrorResponse} from "@angular/common/http";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    MultiSelectModule,
    MessagesModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {

  constructor(private service: UserService, private roleService: RoleService, private messageService: MessageService) {
    this.role = new Role();
    this.roleService.findAll().subscribe((data) => this.roles = data);

  }

  public save(): void {
    this.service.save().subscribe(data => {

      if (data != null) {
        this.items.push(data);
        this.messageService.add({
          severity:'success',
          summary:'Succès',
          detail:'L\'utilisateur a été ajouté avec succès'});
      } else {
        this.messageService.add({
          severity:'error',
          summary:'échec',
          detail:'L\'utilisateur n\'a pas été ajouté'});
      }
    }, (error: HttpErrorResponse) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: `Une erreur est survenue`
      });
    });
    this.createDialog = false;
  }
  get item(): User {
    return this.service.item;
  }

  set item(value: User) {
    this.service.item = value;
  }

  get items(): Array<User> {
    return this.service.items;
  }

  set items(value: Array<User>) {
    this.service.items = value;
  }



  get role(): Role {
    return this.roleService.item;
  }

  set role(value: Role) {
    this.roleService.item = value;
  }

  get roles(): Array<Role> {
    return this.roleService.items;
  }

  set roles(value: Array<Role>) {
    this.roleService.items = value;
  }

  hideCreateDialog() {
    this.createDialog = false;
  }

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }

}
