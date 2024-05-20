import {Component, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import {DepartementService} from "../../../../../shared/service/admin/departement/departement.service";
import {DepartementDto} from "../../../../../shared/model/departement/departement.model";

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnInit{
  nbrEmployeList: (number | null)[] = [];
  depNom: (String | null)[] = [];
  constructor(private departementService: DepartementService) {



  }
  ngOnInit(): void {
    this.departement = new DepartementDto()
    this.departementService.findAll().subscribe((data) => {
      this.departements = data;
      this.nbrEmployeList = this.departements.map((department) => department.nbrEmploye);
      this.depNom = this.departements.map((department) => department.libelle);
      console.log(this.nbrEmployeList);
      this.createChart();
    });


  }


  public chart: any;

  createChart(){
    console.log(this.nbrEmployeList)
    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels : this.depNom,
        datasets: [{

          data: this.nbrEmployeList,
          backgroundColor: [
            '#4333A6',
            '#2585D9',
            '#1e3a59',
            'yellow',
            'orange',
            'blue',
          ],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio:2.5
      }

    });
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
}
