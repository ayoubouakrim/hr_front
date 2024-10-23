import { Component } from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {PaginatorModule} from "primeng/paginator";
import {
  DemandeDocumentAdminService
} from "../../../../../../shared/service/admin/demande/demande-document-admin.service";
import {TypeDocumentDto} from "../../../../../../shared/model/demande/type-document.model";
import {DemandeDocumentDto} from "../../../../../../shared/model/demande/demande-document.model";
import {EtatDemandeDto} from "../../../../../../shared/model/demande/etat-demande.model";
import {TypeDocumentService} from "../../../../../../shared/service/admin/demande/type-document.service";
import {EtatDemandeService} from "../../../../../../shared/service/admin/demande/etat-demande.service";
import {DemandeCongeDto} from "../../../../../../shared/model/demande/demande-conge.model";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-demande-document-view',
  standalone: true,
  imports: [
    DialogModule,
    PaginatorModule,
    ToastModule
  ],
  providers:[MessageService],
  templateUrl: './demande-document-view.component.html',
  styleUrl: './demande-document-view.component.css'
})
export class DemandeDocumentViewComponent {

  constructor(private service : DemandeDocumentAdminService, private typeDocumentService : TypeDocumentService
    , private etatDemandeService : EtatDemandeService ,  private messageService: MessageService) {
  }

  get typeDocument(): TypeDocumentDto {
    return this.typeDocumentService.item;
  }
  set typeDocument(value: TypeDocumentDto) {
    this.typeDocumentService.item = value;
  }
  get typeDocuments(): Array<TypeDocumentDto> {
    return this.typeDocumentService.items;
  }
  set typeDocuments(value: Array<TypeDocumentDto>) {
    this.typeDocumentService.items = value;
  }

  showDialog(): void {
    this.service.showDialog();
  }

  get item(): DemandeDocumentDto{
    return this.service.item;
  }

  set item(value: DemandeDocumentDto) {
    this.service.item = value;
  }

  get items(): Array<DemandeDocumentDto> {
    return this.service.items;
  }

  set items(value: Array<DemandeDocumentDto>) {
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

  accepter(item:DemandeDocumentDto){
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
  refuser(item:DemandeDocumentDto){
    this.item.etatDemande.code="c2";
    this.item.etatDemande.libelle="refuse";
    this.service.update(item).subscribe(data => {
      if (data != null) {
        const position = this.items.indexOf(item);
        position > -1 ? this.items.splice(position, 1) : false;
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
