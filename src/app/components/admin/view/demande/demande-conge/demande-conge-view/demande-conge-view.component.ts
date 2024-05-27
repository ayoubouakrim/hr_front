import { Component } from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {PaginatorModule} from "primeng/paginator";
import {DemandeCongeAdminService} from "../../../../../../shared/service/admin/demande/demande-conge-admin.service";
import {TypeCongeDto} from "../../../../../../shared/model/conge/type-conge.model";
import {DemandeCongeDto} from "../../../../../../shared/model/demande/demande-conge.model";
import {EtatDemandeDto} from "../../../../../../shared/model/demande/etat-demande.model";
import {TypeCongeService} from "../../../../../../shared/service/admin/conge/type-conge.service";
import {EtatDemandeService} from "../../../../../../shared/service/admin/demande/etat-demande.service";
import {DemandeAbsenceDto} from "../../../../../../shared/model/demande/demande-absence.model";

@Component({
  selector: 'app-demande-conge-view',
  standalone: true,
    imports: [
        DialogModule,
        PaginatorModule
    ],
  templateUrl: './demande-conge-view.component.html',
  styleUrl: './demande-conge-view.component.css'
})
export class DemandeCongeViewComponent {

  constructor(private service : DemandeCongeAdminService, private typeCongeService : TypeCongeService
    , private etatDemandeService : EtatDemandeService ) {
  }

  get typeConge(): TypeCongeDto {
    return this.typeCongeService.item;
  }
  set typeConge(value: TypeCongeDto) {
    this.typeCongeService.item = value;
  }
  get typeConges(): Array<TypeCongeDto> {
    return this.typeCongeService.items;
  }
  set typeConges(value: Array<TypeCongeDto>) {
    this.typeCongeService.items = value;
  }

  showDialog(): void {
    this.service.showDialog();
  }

  get item(): DemandeCongeDto{
    return this.service.item;
  }

  set item(value: DemandeCongeDto) {
    this.service.item = value;
  }

  get items(): Array<DemandeCongeDto> {
    return this.service.items;
  }

  set items(value: Array<DemandeCongeDto>) {
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

  accepter(item:DemandeCongeDto){
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
  refuser(item:DemandeCongeDto){
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
