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
import {DatePipe} from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-demande-conge-view',
  standalone: true,
    imports: [
        DialogModule,
        PaginatorModule,
        DatePipe,
      MessagesModule,
      ToastModule,
    ],
  providers: [MessageService],
  templateUrl: './demande-conge-view.component.html',
  styleUrl: './demande-conge-view.component.css'
})
export class DemandeCongeViewComponent {

  constructor(private service : DemandeCongeAdminService, private typeCongeService : TypeCongeService
    , private etatDemandeService : EtatDemandeService, private messageService: MessageService) {
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
        this.messageService.add({
          severity:'success',
          summary:'Succès',
          detail:'le demande a été accepté avec succès'});
      } else {
        this.messageService.add({
          severity:'error',
          summary:'échec',
          detail:'Une erreur est survenue'});
      }
    }, (error: HttpErrorResponse) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: `Une erreur est survenue`
      });
    });
    this.viewDialog = false;
  }
  refuser(item:DemandeCongeDto){
    this.item.etatDemande.code="c2";
    this.item.etatDemande.libelle="refuse";
    this.service.update(item).subscribe(data => {
      if (data != null) {
        this.items.push(data);
        this.messageService.add({
          severity:'error',
          summary:'Refusé',
          detail:'le demande a été réfusé avec succès'});
      } else {
        this.messageService.add({
          severity:'error',
          summary:'échec',
          detail:'Une erreur est survenue'});
      }
    }, (error: HttpErrorResponse) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: `Une erreur est survenue`
      });
    });
    this.viewDialog = false;
  }
}
