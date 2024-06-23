import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {NotificationDto} from "../../../../../shared/model/notification/notification.model";
import {NotificationAdminService} from "../../../../../shared/service/admin/notification/notification.service";
import {DepartementCreateComponent} from "../../departement/create/departement-create.component";
import {DepartementEditComponent} from "../../departement/edit/departement-edit.component";
import {DepartementViewComponent} from "../../departement/view/departement-view.component";
import {NotificationCreateComponent} from "../create/notification-create.component";
import {NotificationViewComponent} from "../view/notification-view.component";
import {EmployeDto} from "../../../../../shared/model/employe/employe.model";
import {NotificationEditComponent} from "../edit/notification-edit.component";


@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [
    ButtonModule,
    SharedModule,
    TableModule,
    DepartementCreateComponent,
    DepartementEditComponent,
    DepartementViewComponent,
    NotificationCreateComponent,
    CommonModule,
    NotificationViewComponent,
    NotificationEditComponent
  ],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent implements OnInit{

  constructor(private service: NotificationAdminService) {
  }


  ngOnInit(): void {
    this.findAll();
  }


  public findAll(): void {
    this.service.findAll().subscribe(data => {
      this.items = data;
    })
  }

  parseDate(dateArray: number[]): string {
    // Check if dateArray is an array and has 6 elements
    if (!Array.isArray(dateArray) || dateArray.length !== 6) {
      console.error('Invalid date array:', dateArray);
      return '';
    }
    // Destructure date components
    const [year, month, day, hours, minutes, seconds] = dateArray;
    // Construct a new date string in a format that Angular's date pipe can understand
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
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

  showDialog(): void {
    this.createDialog = true;
  }

  public view(dto: NotificationDto) {
    this.service.findByCode(dto).subscribe(res => {
      this.item = res;
      this.extractEmployeesFromNotificationEmployes(); // Call the method to extract employees
      this.viewDialog = true;
    });
  }
  extractEmployeesFromNotificationEmployes() {
    this.extractedEmployees = []; // Clear the extractedEmployees array
    // Iterate over each NotificationEmploye and extract the employee
    this.item.notificationEmployes.forEach(notificationEmploye => {
      this.extractedEmployees.push(notificationEmploye.employe);
    });
    console.log(this.extractedEmployees)
  }
  public edit(dto: NotificationDto) {
    this.service.findByCode(dto).subscribe(res => {
      this.item = res;
      this.editDialog = true;
    });
  }
  public  delete(dto: NotificationDto) {
    this.service.delete(dto).subscribe(status => {
      if (status > 0) {
        const position = this.items.indexOf(dto);
        position > -1 ? this.items.splice(position, 1) : false;

      }

    });
  }
  get  extractedEmployees(): EmployeDto []{
    return this.service.extractedEmployees;
  }
  set extractedEmployees(value: EmployeDto[]) {
    this.service.extractedEmployees = value
  }
  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
  }
  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }

}
