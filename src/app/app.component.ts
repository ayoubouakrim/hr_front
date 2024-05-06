import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {AppSidebarComponent} from "./layout/app-sidebar/app-sidebar.component";
import {AdminDashboardComponent} from "./components/admin/view/admin-dashboard/admin-dashboard.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppSidebarComponent, AdminDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hr-management';
}
