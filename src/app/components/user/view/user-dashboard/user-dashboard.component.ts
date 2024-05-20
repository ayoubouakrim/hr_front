import {Component, OnInit} from '@angular/core';
import {PieChartComponent} from "../../../admin/view/admin-dashboard/pie-chart/pie-chart.component";
import {NgStyle} from "@angular/common";
import {AuthenticationService} from "../../../../shared/security/shared/service/authentication.service";

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    PieChartComponent,
    NgStyle
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit{
  isButtonClicked : boolean = false;

  constructor(private authService: AuthenticationService) {
  }
  onClicked() {
    this.isButtonClicked = !this.isButtonClicked;
  }

  ngOnInit() {
    this.authService.findEmploye();
  }
}
