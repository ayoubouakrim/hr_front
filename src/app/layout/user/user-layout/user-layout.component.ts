import { Component } from '@angular/core';

import {RouterLink, RouterOutlet} from "@angular/router";
import {DialogModule} from "primeng/dialog";
import {AdminDashboardComponent} from "../../../components/admin/view/admin-dashboard/admin-dashboard.component";
import {AppSidebarComponent} from "../../app-sidebar/app-sidebar.component";
import {LayoutService} from "../../../shared/service/layout/layout.service";
import {UserSidebarComponent} from "../user-sidebar/user-sidebar.component";


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    AdminDashboardComponent,
    AppSidebarComponent,
    RouterOutlet,
    RouterLink,
    DialogModule,
    UserSidebarComponent
  ],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

  visible: boolean = false;

constructor(private layoutService :LayoutService) {
}

  public showNotifi(event: Event){
    event.preventDefault();
    this.visible = true;
  }

  logout(){
    this.layoutService.logout();
  }

}
