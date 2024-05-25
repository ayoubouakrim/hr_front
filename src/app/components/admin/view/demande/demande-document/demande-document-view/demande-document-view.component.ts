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

@Component({
  selector: 'app-demande-document-view',
  standalone: true,
    imports: [
        DialogModule,
        PaginatorModule
    ],
  templateUrl: './demande-document-view.component.html',
  styleUrl: './demande-document-view.component.css'
})
export class DemandeDocumentViewComponent {

  constructor(private service : DemandeDocumentAdminService, private typeDocumentService : TypeDocumentService
    , private etatDemandeService : EtatDemandeService ) {
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

  accepter(){
    this.item.etatDemande.libelle="Acceptée";
    this.service.update().subscribe(data => {
      if (data != null) {
        alert("OK");
      } else {
        alert("Error");
      }
    });
  }
  refuser(){
    this.item.etatDemande.libelle="Rejetée";
    this.service.update().subscribe(data => {
      if (data != null) {
        alert("OK");
      } else {
        alert("Error");
      }
    });
  }
}
