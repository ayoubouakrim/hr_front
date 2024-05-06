import { Component } from '@angular/core';
import {AdminDashboardComponent} from "../../components/admin/view/admin-dashboard/admin-dashboard.component";
import {AppSidebarComponent} from "../app-sidebar/app-sidebar.component";
import {RouterLink, RouterOutlet} from "@angular/router";


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    AdminDashboardComponent,
    AppSidebarComponent,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent {

}
