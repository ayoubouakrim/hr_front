import {Component, OnInit} from '@angular/core';
import {AdminDashboardComponent} from "../../components/admin/view/admin-dashboard/admin-dashboard.component";
import {AppSidebarComponent} from "../app-sidebar/app-sidebar.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {DialogModule} from "primeng/dialog";
import {LayoutService} from "../../shared/service/layout/layout.service";
import {NotificationAdminService} from "../../shared/service/admin/notification/notification.service";
import {EmployeService} from "../../shared/service/admin/employe/employe.service";
import {EmployeDto} from "../../shared/model/employe/employe.model";
import {NotificationDto} from "../../shared/model/notification/notification.model";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    AdminDashboardComponent,
    AppSidebarComponent,
    RouterOutlet,
    RouterLink,
    DialogModule,
    DatePipe
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent implements OnInit {

  matricule = localStorage.getItem('matricule');
  imgPath = "";
  notfs = new Array<NotificationDto>;

  constructor(private layoutService: LayoutService, private notificationService: NotificationAdminService, private employeService: EmployeService) {
    this.findProfile(this.matricule as string)
    console.log("fffff"+this.imgPath)
    this.notificationService.findNotifications(this.matricule as string).subscribe( (data) => this.notfs = data)
    console.log(this.notifications)
  }

  ngOnInit(): void {
    this.findProfile(this.matricule as string)
    console.log("fffff"+this.imgPath)
    this.notificationService.findNotifications(this.matricule as string).subscribe( (data) => this.notfs = data)
    console.log(this.notifications)
  }

  visible: boolean = false;

  public logout() {
    this.layoutService.logout();
  }

  public showNotifi(event: Event) {
    event.preventDefault();
    this.visible = true;
  }

  public findProfile(matricule: String) {
    this.employeService.findProfile(matricule).subscribe(res => {
      this.employe = res;
      this.imgPath = res.imagePath as string;
      console.log("layout"+this.employe);
    });
  }



  parseDate(dateArray: number[] | any): string {
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
