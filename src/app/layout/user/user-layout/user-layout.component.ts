import { Component } from '@angular/core';

import {RouterLink, RouterOutlet} from "@angular/router";
import {DialogModule} from "primeng/dialog";
import {AdminDashboardComponent} from "../../../components/admin/view/admin-dashboard/admin-dashboard.component";
import {AppSidebarComponent} from "../../app-sidebar/app-sidebar.component";


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    AdminDashboardComponent,
    AppSidebarComponent,
    RouterOutlet,
    RouterLink,
    DialogModule
  ],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

  visible: boolean = false;



  public showNotifi(event: Event){
    event.preventDefault();
    this.visible = true;
  }





}
