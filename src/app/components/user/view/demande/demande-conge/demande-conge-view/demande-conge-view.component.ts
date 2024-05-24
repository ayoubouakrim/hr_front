import { Component } from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {PaginatorModule} from "primeng/paginator";
import {EtatDemandeDto} from "../../../../../../shared/model/demande/etat-demande.model";
import {DemandeCongeUserService} from "../../../../../../shared/service/user/demande/demande-conge-user.service";
import {TypeCongeDto} from "../../../../../../shared/model/conge/type-conge.model";
import {DemandeCongeDto} from "../../../../../../shared/model/demande/demande-conge.model";
import {DatePipe} from "@angular/common";
import {TypeCongeService} from "../../../../../../shared/service/user/conge/type-conge.service";
import {EtatDemandeService} from "../../../../../../shared/service/user/demande/etat-demande.service";

@Component({
  selector: 'app-demande-conge-view',
  standalone: true,
    imports: [
        DialogModule,
        PaginatorModule,
        DatePipe
    ],
  templateUrl: './demande-conge-view.component.html',
  styleUrl: './demande-conge-view.component.css'
})
export class DemandeCongeViewComponent {

  constructor(private service : DemandeCongeUserService, private typeCongeService : TypeCongeService
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
}
