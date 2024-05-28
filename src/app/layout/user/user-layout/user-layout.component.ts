import {Component, OnInit} from '@angular/core';

import {RouterLink, RouterOutlet} from "@angular/router";
import {DialogModule} from "primeng/dialog";
import {AppSidebarComponent} from "../../app-sidebar/app-sidebar.component";
import {NotificationDto} from "../../../shared/model/notification/notification.model";
import {LayoutService} from "../../../shared/service/layout/layout.service";
import {EmployeDto} from "../../../shared/model/employe/employe.model";
import {NotificationUserService} from "../../../shared/service/user/notification/notification-user.service";
import {EmployeUserService} from "../../../shared/service/user/employe/employe-user.service";
import {DatePipe} from "@angular/common";
import {UserSidebarComponent} from "../user-sidebar/user-sidebar.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    AppSidebarComponent,
    RouterOutlet,
    RouterLink,
    CommonModule,
    DialogModule,
    DatePipe,
    UserSidebarComponent

  ],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent implements OnInit{
  imgPath = "";
  constructor(private layoutService: LayoutService, private notificationService: NotificationUserService, private employeService: EmployeUserService) {

  }

  ngOnInit(): void {
    let username = localStorage.getItem('username')
    if (username) {
      this.employeService.findByUserUsername(username).subscribe({
        next: (res) => {
          let matricule = res.matricule as string;
          this.findProfile(matricule)
          this.notificationService.findNotifications(matricule).subscribe((data) => this.notifications = data)
          console.log(this.notifications)
        },
        error: (error) => {
          console.error("Erreur lors de la recherche de l'employé : ", error);
        }
      });
    }
  }

  visible: boolean = false;

  public logout() {
    this.layoutService.logout();
  }

  public showNotifi(event: Event){

    event.preventDefault();
    this.visible = true;
    if(this.arrayOfNotifications) {
      this.arrayOfNotifications.forEach(notification => {
        notification.checked = true;
        this.notificationService.updateChecked(notification).subscribe({
          next: (response) => {
            console.error('Update successful:', response);
          },
          error: (error) => {
            console.error('Update failed:', error);
          }
        });
      });
    }
    this.arrayOfNotifications = new Array<NotificationDto>();
  }


  public findProfile(matricule: String) {
    this.employeService.findProfile(matricule).subscribe(res => {
      this.employe = res;
      this.imgPath = res.imagePath as string;
      console.log(this.employe);
    });
  }


  get arrayOfNotifications(): Array<NotificationDto> {
    return this.notificationService.notifications;
  }

  set arrayOfNotifications(value: Array<NotificationDto>) {
    this.notificationService.notifications = value;
  }



  parseDate(dateArray: number[] | any): string {
    if (!Array.isArray(dateArray) || dateArray.length !== 6) {
      console.error('Invalid date array:', dateArray);
      return '';
    }
    const [year, month, day, hours, minutes, seconds] = dateArray;
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
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


  get notification(): NotificationDto {
    return this.notificationService.item;
  }

  set notification(value: NotificationDto) {
    this.notificationService.item = value;
  }

  get notifications(): Array<NotificationDto> {
    return this.notificationService.items;
  }

  set notifications(value: Array<NotificationDto>) {
    this.notificationService.items = value;
  }
}
