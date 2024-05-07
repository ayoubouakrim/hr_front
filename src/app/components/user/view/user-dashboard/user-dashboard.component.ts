import { Component } from '@angular/core';
<<<<<<< HEAD
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
=======

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [],
>>>>>>> 01f2a9d1b8b5d611932e9cab13c24205299cf151
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
<<<<<<< HEAD
  products: any;
=======
>>>>>>> 01f2a9d1b8b5d611932e9cab13c24205299cf151

}
