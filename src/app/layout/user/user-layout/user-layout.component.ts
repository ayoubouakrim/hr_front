import {Component} from '@angular/core';

import {RouterLink, RouterOutlet} from "@angular/router";
import {DialogModule} from "primeng/dialog";
import {AdminDashboardComponent} from "../../../components/admin/view/admin-dashboard/admin-dashboard.component";
import {AppSidebarComponent} from "../../app-sidebar/app-sidebar.component";
import {LayoutService} from "../../../shared/service/layout/layout.service";
import {UserSidebarComponent} from "../user-sidebar/user-sidebar.component";
import {CommonModule} from "@angular/common";
import {NotificationDto} from "../../../shared/model/notification/notification.model";
import {NotificationUserService} from "../../../shared/service/user/notification/notification-user.service";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    AdminDashboardComponent,
    AppSidebarComponent,
    RouterOutlet,
    RouterLink,
    CommonModule,
    DialogModule,
    UserSidebarComponent
  ],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

  visible: boolean = false;

constructor(private layoutService :LayoutService, private notificationService: NotificationUserService) {
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

  logout(){
    this.layoutService.logout();
  }

  get arrayOfNotifications(): Array<NotificationDto> {
    return this.notificationService.items;
  }

  set arrayOfNotifications(value: Array<NotificationDto>) {
    this.notificationService.items = value;
  }
}
