import { Component } from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {PaginatorModule} from "primeng/paginator";
import {TypeAbsenceDto} from "../../../../../../shared/model/conge/type-absence.model";
import {EtatDemandeDto} from "../../../../../../shared/model/demande/etat-demande.model";
import {DemandeAbsenceDto} from "../../../../../../shared/model/demande/demande-absence.model";
import {DemandeAbsenceAdminService} from "../../../../../../shared/service/admin/demande/demande-absence-admin.service";
import {TypeAbsenceService} from "../../../../../../shared/service/admin/conge/type-absence.service";
import {EtatDemandeService} from "../../../../../../shared/service/admin/demande/etat-demande.service";

@Component({
  selector: 'app-demande-absence-view',
  standalone: true,
    imports: [
        DialogModule,
        PaginatorModule
    ],
  templateUrl: './demande-absence-view.component.html',
  styleUrl: './demande-absence-view.component.css'
})
export class DemandeAbsenceViewComponent {

  constructor(private service : DemandeAbsenceAdminService, private typeAbsenceService : TypeAbsenceService
    , private etatDemandeService : EtatDemandeService ) {
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

  accepter(item:DemandeAbsenceDto){
    this.item.etatDemande.code="c1";
    this.item.etatDemande.libelle="Acceptée";
    this.service.update(item).subscribe(data => {
      if (data != null) {
        alert("OK");
      } else {
        alert("Error");
      }
    });
  }
  refuser(item:DemandeAbsenceDto){
    this.item.etatDemande.code="c2";
    this.item.etatDemande.libelle="refuse";
    this.service.update(item).subscribe(data => {
      if (data != null) {
        alert("OK");
      } else {
        alert("Error");
      }
    });
  }

}
