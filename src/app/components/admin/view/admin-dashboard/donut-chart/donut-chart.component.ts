import {Component, OnInit} from '@angular/core';
import {DemandeCongeAdminService} from "../../../../../shared/service/admin/demande/demande-conge-admin.service";
import {DemandeAbsenceAdminService} from "../../../../../shared/service/admin/demande/demande-absence-admin.service";
import {DemandeDocumentAdminService} from "../../../../../shared/service/admin/demande/demande-document-admin.service";
import {DemandeAbsenceDto} from "../../../../../shared/model/demande/demande-absence.model";
import {DemandeCongeDto} from "../../../../../shared/model/demande/demande-conge.model";
import {DemandeDocumentDto} from "../../../../../shared/model/demande/demande-document.model";
import Chart from "chart.js/auto";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [],
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.css'
})
export class DonutChartComponent  implements OnInit{
  public chart: any;
  totalConge: number = 0 ;
  totalAbsence: number = 0 ;
  totalDocuments: number = 0 ;
  constructor(private demandeCongeService: DemandeCongeAdminService, private demandeAbsenceService: DemandeAbsenceAdminService,  private demandeDocumentService: DemandeDocumentAdminService) {
    this.item = new DemandeDocumentDto();
    this.demandeConge = new DemandeCongeDto();
    this.demandeAbsence = new DemandeAbsenceDto();
  }

  ngOnInit(): void {
    this.loadData()
  }
  loadData() {
    forkJoin([
      this.demandeCongeService.findAll(),
      this.demandeAbsenceService.findAll(),

    ]).subscribe(
      ([congeData, absenceData]) => {
        // Handle conge data
        this.demandeConges = congeData;
        const filteredCongeData = congeData.filter(item => item.etatDemande && item.etatDemande.code == "c3");
        this.totalConge = filteredCongeData.length;

        // Handle absence data
        this.demandeAbsences = absenceData;
        const filteredAbsenceData = absenceData.filter(item => item.etatDemande && item.etatDemande.code == "c3");
        this.totalAbsence = filteredAbsenceData.length;

        // Handle document data


        // Create chart after all data is loaded
        this.createDonutChart();
      },
      error => {
        console.error('Error fetching data', error);
      }
    );

  }

  get demandeAbsence(): DemandeAbsenceDto {
    return this.demandeAbsenceService.item;
  }

  set demandeAbsence(value: DemandeAbsenceDto) {
    this.demandeAbsenceService.item = value;
  }

  get demandeAbsences(): Array<DemandeAbsenceDto> {
    return this.demandeAbsenceService.items;
  }
  createDonutChart(){
    console.log("gggggg"+this.totalConge)
    this.chart = new Chart("MyChart2", {
      type: 'doughnut', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Conge', 'Absence','Document', ],
        datasets: [{
          label: 'My First Dataset',
          data: [this.totalConge, this.totalAbsence, this.totalDocuments],
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

  set demandeAbsences(value: Array<DemandeAbsenceDto>) {
    this.demandeAbsenceService.items = value;
  }

  get demandeConge(): DemandeCongeDto {
    return this.demandeCongeService.item;
  }

  set demandeConge(value: DemandeCongeDto) {
    this.demandeCongeService.item = value;
  }

  get demandeConges(): Array<DemandeCongeDto> {
    return this.demandeCongeService.items;
  }

  set demandeConges(value: Array<DemandeCongeDto>) {
    this.demandeCongeService.items = value;
  }

  get item(): DemandeDocumentDto {
    return this.demandeDocumentService.item;
  }

  set item(value: DemandeDocumentDto) {
    this.demandeDocumentService.item = value;
  }

  get items(): Array<DemandeDocumentDto> {
    return this.demandeDocumentService.items;
  }

  set items(value: Array<DemandeDocumentDto>) {
    this.demandeDocumentService.items = value;
  }

}
