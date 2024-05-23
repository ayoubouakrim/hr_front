import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {UserService} from "../../../../../shared/security/shared/service/user.service";
import {User} from "../../../../../shared/security/shared/model/user.model";
import {UserCreateComponent} from "../user-create/user-create.component";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    ButtonModule,
    SharedModule,
    TableModule,
    UserCreateComponent,
    NgStyle,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{

  constructor(private service: UserService) {
  }

  ngOnInit(): void {
    this.findAll();
  }

  getColor(roleName: string): string {
    if (roleName === 'ADMIN') {
      return '#fd8626'; // Background color for Admin
    } else if (roleName === 'USER') {
      return '#5281b7'; // Background color for User
    } else {
      return 'lightgray'; // Default background color for other roles
    }
  }




  public findAll(): void {
    this.service.findAll().subscribe(data => {
      this.items = data;
    })
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

  showDialog(): void {
    this.createDialog = true;
  }






  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }



}
