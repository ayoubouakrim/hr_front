import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogModule} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NotificationDto} from "../../../../../shared/model/notification/notification.model";
import {EmployeDto} from "../../../../../shared/model/employe/employe.model";
import {ListboxModule} from "primeng/listbox";
import {DropdownModule} from "primeng/dropdown";
import {NotificationAdminService} from "../../../../../shared/service/admin/notification/notification.service";
@Component({
  selector: 'app-notification-view',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    ListboxModule,
    DropdownModule,
    CommonModule
  ],
  templateUrl: './notification-view.component.html',
  styleUrl: './notification-view.component.css'
})
export class NotificationViewComponent{

  constructor(private service: NotificationAdminService) {

  }



  get extractedEmployees(): EmployeDto[] {
    return this.service.extractedEmployees;
  }
  set extractedEmployees(value : EmployeDto[]) {
    this.service.extractedEmployees = value;
  }
  get item(): NotificationDto {
    return this.service.item;
  }

  set item(value: NotificationDto) {
    this.service.item = value;
  }

  get items(): Array<NotificationDto> {
    return this.service.items;
  }

  set items(value: Array<NotificationDto>) {
    this.service.items = value;
  }



  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }



}
