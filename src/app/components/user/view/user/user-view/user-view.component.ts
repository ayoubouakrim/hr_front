import {Component, OnInit} from '@angular/core';
import {UserUserService} from "../../../../../shared/security/shared/service/user-user.service";
import {DatePipe} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {User} from "../../../../../shared/security/shared/model/user.model";
import {UserService} from "../../../../../shared/security/shared/service/user.service";
import {Role} from "../../../../../shared/security/shared/model/role.model";
import {UserEditComponent} from "../user-edit/user-edit.component";


@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [
    DatePipe,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    UserEditComponent
  ],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent implements OnInit {
  constructor(private userService: UserUserService, private userService1: UserService) {
  }

  ngOnInit() {
    const username = localStorage.getItem('username') as string;
    if (username) {
      this.userService.findByUsername(username).subscribe({
        next: (response) => {
          this.item = response;
        },
        error: (error) => {
          console.error('find failed:', error);
        }
      });
    }
  }

  public edit() {
    this.editDialog = true;
  }

  get editDialog(): boolean {
    return this.userService.editDialog;
  }

  set editDialog(value: boolean) {
    this.userService.editDialog = value;
  }
  get item(): User {
    return this.userService1.item;
  }

  set item(value: User) {
    this.userService1.item = value;
  }
}
