import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {MessageService, SharedModule} from "primeng/api";
import {EmployeService} from "../../../../../shared/service/admin/employe/employe.service";
import {NotificationDto} from "../../../../../shared/model/notification/notification.model";
import {EmployeDto} from "../../../../../shared/model/employe/employe.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastModule} from "primeng/toast";
import {MessagesModule} from "primeng/messages";
import {DatePipe} from "@angular/common";
import {NotificationAdminService} from "../../../../../shared/service/admin/notification/notification.service";
import {NotificationEmployeDto} from "../../../../../shared/model/notification/notification-employe.model";
import {MultiSelectModule} from "primeng/multiselect";


@Component({
  selector: 'app-notification-edit',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    PaginatorModule,
    SharedModule,
    MessagesModule,
    ToastModule,
    DatePipe,
    MultiSelectModule,
  ],
  providers: [MessageService],
  templateUrl: './notification-edit.component.html',
  styleUrl: './notification-edit.component.css'
})
export class NotificationEditComponent implements OnInit {
  constructor(private service: NotificationAdminService, private employeService: EmployeService, private messageService: MessageService) {
  }

  selectedEmployees: EmployeDto[] = [];

  ngOnInit(): void {
    this.employe = new EmployeDto();
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

  public update(): void {
    this.updateNotificationEmployes(this.selectedEmployees);
    console.log(this.item.notificationEmployes);
    this.service.update().subscribe(data => {
      if (data != null) {
        this.messageService.add({
          severity:'success',
          summary:'Succès',
          detail:'la notification a été édité avec succès'});
      } else {
        this.messageService.add({
          severity:'error',
          summary:'échec',
          detail:'la notification n\'a pas été édité'});
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

  hideCreateDialog() {
    this.editDialog = false;
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

  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
  }

}

