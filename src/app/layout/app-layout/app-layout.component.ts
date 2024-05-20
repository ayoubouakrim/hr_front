import { Component } from '@angular/core';
import {AdminDashboardComponent} from "../../components/admin/view/admin-dashboard/admin-dashboard.component";
import {AppSidebarComponent} from "../app-sidebar/app-sidebar.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {DialogModule} from "primeng/dialog";


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
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent {

  visible: boolean = false;



  public showNotifi(event: Event){
    event.preventDefault();
    this.visible = true;
  }





}
