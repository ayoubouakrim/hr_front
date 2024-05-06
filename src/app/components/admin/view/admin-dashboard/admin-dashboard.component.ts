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
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  products: any;

}
