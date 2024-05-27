import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {DemandeAbsenceViewComponent} from "../demande-absence-view/demande-absence-view.component";
import {DemandeAbsenceAdminService} from "../../../../../../shared/service/admin/demande/demande-absence-admin.service";
import {DemandeAbsenceDto} from "../../../../../../shared/model/demande/demande-absence.model";
import {TypeAbsenceDto} from "../../../../../../shared/model/conge/type-absence.model";
import {EtatDemandeDto} from "../../../../../../shared/model/demande/etat-demande.model";
import {TypeAbsenceService} from "../../../../../../shared/service/admin/conge/type-absence.service";
import {EtatDemandeService} from "../../../../../../shared/service/admin/demande/etat-demande.service";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-demande-absence-list',
  standalone: true,
  imports: [
    ButtonModule,
    SharedModule,
    TableModule,
    DemandeAbsenceViewComponent,
    NgStyle,
  ],
  templateUrl: './demande-absence-list.component.html',
  styleUrl: './demande-absence-list.component.css'
})
export class DemandeAbsenceListAdminComponent implements OnInit{

  constructor(private service : DemandeAbsenceAdminService, private typeAbsenceService : TypeAbsenceService
    , private etatDemandeService : EtatDemandeService ) {
  }

  public view(dto: DemandeAbsenceDto) {
    this.service.findByCode(dto).subscribe(res => {
      this.item = res;
      this.viewDialog = true;
    });
  }
  public edit(dto: DemandeAbsenceDto) {
    this.service.findByCode(dto).subscribe(res => {
      this.item = res;
      this.editDialog = true;
    });
  }

  ngOnInit(): void {
    this.findAll();
  }

  public getColor(status: string): string {
    if (status === 'c3') {
      return '#c49236'; // Background color for Non commencé
    } else if (status === 'c1') {
      return '#239142'; // Background color for En cours
    } else if (status === 'c2') {
      return '#9d1414'; // Background color for Terminé
    } else {
      return 'lightgray'; // Default background color for other statuses
    }
  }

  public findAll(): void {
    this.service.findAll().subscribe(data => {
      this.items = data;
    })
  }

  get item(): DemandeAbsenceDto{
    return this.service.item;
  }

  set item(value: DemandeAbsenceDto) {
    this.service.item = value;
  }

  get items(): Array<DemandeAbsenceDto> {
    return this.service.items;
  }

  set items(value: Array<DemandeAbsenceDto>) {
    this.service.items = value;
  }

  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }

  get typeAbsence(): TypeAbsenceDto {
    return this.typeAbsenceService.item;
  }
  set typeAbsence(value: TypeAbsenceDto) {
    this.typeAbsenceService.item = value;
  }
  get typeAbsences(): Array<TypeAbsenceDto> {
    return this.typeAbsenceService.items;
  }
  set typeAbsences(value: Array<TypeAbsenceDto>) {
    this.typeAbsenceService.items = value;
  }

  get etatDemande(): EtatDemandeDto {
    return this.etatDemandeService.item;
  }
  set etatDemande(value: EtatDemandeDto) {
    this.etatDemandeService.item = value;
  }
  get etatDemandes(): Array<EtatDemandeDto> {
    return this.etatDemandeService.items;
  }
  set etatDemandes(value: Array<EtatDemandeDto>) {
    this.etatDemandeService.items = value;
  }
}
