import {Component, OnInit} from '@angular/core';
import {PieChartComponent} from "./pie-chart/pie-chart.component";
import {TableModule} from 'primeng/table';
import {EmployeListComponent} from "../employe/employe/list/employe-list.component";
import {EmployeService} from "../../../../shared/service/admin/employe/employe.service";
import {CongeAdminService} from "../../../../shared/service/admin/conge/conge-admin.service";
import {DepartementService} from "../../../../shared/service/admin/departement/departement.service";
import {EmployeDto} from "../../../../shared/model/employe/employe.model";
import {DepartementDto} from "../../../../shared/model/departement/departement.model";
import {CongeDto} from "../../../../shared/model/conge/conge.model";
import {AuthenticationService} from "../../../../shared/security/shared/service/authentication.service";


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
export class AdminDashboardComponent implements OnInit {

  currentDate: Date = new Date();

  constructor(private employeService: EmployeService, private congeService: CongeAdminService, private departementService: DepartementService,private authService: AuthenticationService) {
    this.employe = new EmployeDto();
    this.employeService.findAll().subscribe((data) => this.employes = data.filter(item => !item.archive));
    this.departement = new DepartementDto();
    this.departementService.findAll().subscribe((data) => this.departements = data);
    this.conge = new CongeDto();
    this.congeService.findAll().subscribe((data) => {
      this.conges = data.filter((conge) => {
        if (conge.dateDebut && conge.dateFin) {
          const startDate = new Date(conge.dateDebut);
          const endDate = new Date(conge.dateFin);
          return this.currentDate >= startDate && this.currentDate <= endDate && conge.employe.archive == false;
        }
        return false;
      });
      // Log inside the subscription block to ensure data availability
      console.log("Filtered Conges:", this.conges);
    });

// This console.log will execute before the subscription block finishes
// and may show 'undefined' because the data hasn't been fetched yet
    console.log("Outside Subscription:", this.conges);


  }

  ngOnInit(): void {
    this.getTotalSalaire();
    this.authService.findAdmin();
  }


  private _totalsalaire!: number;

  public getTotalSalaire() {
    this.employeService.totalSalaire().subscribe(data => {
      this.totalsalaire = data;
    });
    console.log(this._totalsalaire)
  }

  get totalsalaire(): number {
    return this._totalsalaire;
  }

  set totalsalaire(value: number) {
    this._totalsalaire = value;
  }

  get employe(): EmployeDto {
    return this.employeService.item;
  }

  set employe(value: EmployeDto) {
    this.employeService.item = value;
  }

  get employes(): Array<EmployeDto> {
    return this.employeService.items;
  }

  set employes(value: Array<EmployeDto>) {
    this.employeService.items = value;
  }

  get departement(): DepartementDto {
    return this.departementService.item;
  }

  set departement(value: DepartementDto) {
    this.departementService.item = value;
  }

  get departements(): Array<DepartementDto> {
    return this.departementService.items;
  }

  set departements(value: Array<DepartementDto>) {
    this.departementService.items = value;
  }

  get conge(): CongeDto {
    return this.congeService.item;
  }

  set conge(value: CongeDto) {
    this.congeService.item = value;
  }

  get conges(): Array<CongeDto> {
    return this.congeService.items;
  }

  set conges(value: Array<CongeDto>) {
    this.congeService.items = value;
  }


}
