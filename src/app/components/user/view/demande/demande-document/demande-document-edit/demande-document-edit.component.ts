import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {MessageService, SharedModule} from "primeng/api";
import {EtatDemandeDto} from "../../../../../../shared/model/demande/etat-demande.model";
import {DemandeDocumentUserService} from "../../../../../../shared/service/user/demande/demande-document-user.service";
import {TypeDocumentDto} from "../../../../../../shared/model/demande/type-document.model";
import {DemandeDocumentDto} from "../../../../../../shared/model/demande/demande-document.model";
import {EtatDemandeService} from "../../../../../../shared/service/user/demande/etat-demande.service";
import {TypeDocumentService} from "../../../../../../shared/service/user/demande/type-document.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-demande-document-edit',
  standalone: true,
    imports: [
        ButtonModule,
        DialogModule,
        DropdownModule,
        PaginatorModule,
        SharedModule
    ],
  templateUrl: './demande-document-edit.component.html',
  styleUrl: './demande-document-edit.component.css'
})
export class DemandeDocumentEditComponent {

  constructor(private service : DemandeDocumentUserService, private typeDocumentService : TypeDocumentService
    , private etatDemandeService : EtatDemandeService, private messageService: MessageService) {
  }

  public update(): void {
    this.service.update().subscribe(data => {
      if (data != null) {
        this.items = this.items.filter(obj => obj.id !== this.item.id);
        this.items.push(data);
        this.messageService.add({
          severity:'success',
          summary:'Succès',
          detail:'le Congé a été ajouté avec succès'});
      } else {
        this.messageService.add({
          severity:'error',
          summary:'échec',
          detail:'le conge n\'a pas été ajouté'});
      }
    }, (error: HttpErrorResponse) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: `Une erreur est survenue`
      });
    });
  }

  hideCreateDialog() {
    this.editDialog = false;
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
