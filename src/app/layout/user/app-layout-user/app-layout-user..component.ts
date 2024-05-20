import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {UserDashboardComponent} from "../../../components/user/view/user-dashboard/user-dashboard.component";
import {AppSidebarUserComponent} from "../app-sidebar-user/app-sidebar-user..component";
import {AppSidebarComponent} from "../../app-sidebar/app-sidebar.component";
import {AppTopBarComponentComponent} from "../app-top-bar-component/app-top-bar-component.component";
import {NgStyle} from "@angular/common";


@Component({
  selector: 'app-layout-user',
  standalone: true,
  imports: [
    UserDashboardComponent,
    AppSidebarUserComponent,
    RouterOutlet,
    RouterLink,
    AppSidebarComponent,
    AppTopBarComponentComponent,
    NgStyle
  ],
  templateUrl: './app-layout-user..component.html',
  styleUrl: './app-layout-user..component.css'
})
export class AppLayoutUserComponent {

  isSidebarHidden: boolean = false;

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
