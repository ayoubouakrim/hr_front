import { Component } from '@angular/core';
import {NotificationDto} from "../../../../../shared/model/notification/notification.model";
import {NotificationAdminService} from "../../../../../shared/service/admin/notification/notification.service";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {PaginatorModule} from "primeng/paginator";
import {SharedModule} from "primeng/api";
import {MultiSelectModule} from "primeng/multiselect";
import {EmployeDto} from "../../../../../shared/model/employe/employe.model";
import {EmployeService} from "../../../../../shared/service/admin/employe/employe.service";
import {NotificationEmployeDto} from "../../../../../shared/model/notification/notification-employe.model";



@Component({
  selector: 'app-notification-create',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    PaginatorModule,
    SharedModule,
    MultiSelectModule
  ],
  templateUrl: './notification-create.component.html',
  styleUrl: './notification-create.component.css'
})
export class NotificationCreateComponent {
  selectedEmployees: EmployeDto[] = [];

  constructor(private service: NotificationAdminService, private employeService: EmployeService) {
    this.employe = new EmployeDto()
    this.employeService.findAll().subscribe((data) => this.employes = data);

  }

  public updateNotificationEmployes(selectedEmployees: EmployeDto[]) {
    // Map selected employees to NotificationEmployeDto objects
    const notificationEmployes = selectedEmployees.map(emp => {
      const notificationEmploye = new NotificationEmployeDto();
      notificationEmploye.employe = emp;
      return notificationEmploye;
    });

    // Assign updated notificationEmployes array to item.notificationEmployes
    this.item.notificationEmployes = notificationEmployes;
  }

  public save(): void {
    this.updateNotificationEmployes(this.selectedEmployees)
    console.log(this.item)
    this.service.save().subscribe(data => {
      if (data != null) {
        alert("OK");
      } else {
        alert("Error");
      }
    });
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

  hideCreateDialog() {
    this.createDialog = false;
  }

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }
  get employe(): EmployeDto {
    return this.employeService.item;
  }

  set employe(value: EmployeDto) {
    this.employeService.item = value;
  }

  get employes(): Array<EmployeDto> {
    return this.employeService.items;
  }

  set employes(value: Array<EmployeDto>) {
    this.employeService.items = value;
  }

}
