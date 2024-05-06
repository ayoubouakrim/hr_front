import { Component } from '@angular/core';
import {PieChartComponent} from "./pie-chart/pie-chart.component";
import { TableModule } from 'primeng/table';
import {EmployeListComponent} from "../employe/employe/list/employe-list.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    PieChartComponent,
    TableModule,
    EmployeListComponent
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  products: any;

}
