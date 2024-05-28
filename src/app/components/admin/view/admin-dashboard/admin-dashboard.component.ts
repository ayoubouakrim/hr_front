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
import {DonutChartComponent} from "./donut-chart/donut-chart.component";
import {User} from "../../../../shared/security/shared/model/user.model";
import {UserService} from "../../../../shared/security/shared/service/user.service";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {PaginatorModule} from "primeng/paginator";
import {AdminEditComponent} from "./admin-edit/admin-edit.component";


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    PieChartComponent,
    TableModule,
    EmployeListComponent,
    DonutChartComponent,
    ButtonModule,
    DialogModule,
    PaginatorModule,
    AdminEditComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  user: User = new User();
  employee: EmployeDto = new EmployeDto();
  currentDate: Date = new Date();

  constructor(private employeService: EmployeService, private congeService: CongeAdminService, private departementService: DepartementService, private authService: AuthenticationService, private userService: UserService) {
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
    console.log("Outside Subscription:", this.conges);
    this.getTotalSalaire();



  }

  matricule = localStorage.getItem('matricule');

  ngOnInit(): void {
    this.getTotalSalaire();
    this.findAdmin();

  }

  public findAdmin() {
    const username = localStorage.getItem('username') as string;
    this.findUser(username);
    this.employeService.findByUserUsername(username).subscribe({
      next: (res) => {
        this.matricule = res.matricule as string;
        localStorage.setItem('matricule', this.matricule);

        this.findProfile(this.matricule as string); //fonction

      },
      error: (error) => {
        console.error("Erreur lors de la recherche de l'employé : ", error);
      }
    });
  }

  public findProfile(matricule: String) {
    this.employeService.findProfile(matricule).subscribe(res => {
      this.employee = res
      console.log(this.employee);
    });
  }

  public findUser(username: string) {

    if (username) {
      this.userService.findByUsername(username).subscribe({
        next: (response) => {
          this.user = response;
        },
        error: (error) => {
          console.error('find failed:', error);
        }
      });
    }
  }


  private _totalsalaire!: number;

  public getTotalSalaire() {
    this.employeService.totalSalaire().subscribe(data => {
      this.totalsalaire = data;
    });
    console.log(this._totalsalaire)
  }

  public edit() {
    this.item = this.user;
    this.editDialog = true;
  }

  get item(): User {
    return this.userService.item;
  }

  set item(value: User) {
    this.userService.item = value;
  }

  get editDialog(): boolean {
    return this.userService.editDialog;
  }

  set editDialog(value: boolean) {
    this.userService.editDialog = value;
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
