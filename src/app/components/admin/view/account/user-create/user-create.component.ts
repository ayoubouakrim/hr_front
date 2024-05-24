import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {UserService} from "../../../../../shared/security/shared/service/user.service";
import {User} from "../../../../../shared/security/shared/model/user.model";
import {RoleService} from "../../../../../shared/security/shared/service/role.service";
import {Role} from "../../../../../shared/security/shared/model/role.model";
import {MultiSelectModule} from "primeng/multiselect";

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
    MultiSelectModule
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {

  constructor(private service: UserService, private roleService: RoleService) {
    this.role = new Role();
    this.roleService.findAll().subscribe((data) => this.roles = data);

  }

  public save(): void {
    this.service.save().subscribe(data => {
      if (data != null) {
        alert("OK");
      } else {
        alert("Error");
      }
    });
    this.hideCreateDialog()
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
