import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {MessageService, SharedModule} from "primeng/api";
import {EtatDemandeDto} from "../../../../../../shared/model/demande/etat-demande.model";
import {DemandeCongeUserService} from "../../../../../../shared/service/user/demande/demande-conge-user.service";
import {DemandeCongeDto} from "../../../../../../shared/model/demande/demande-conge.model";
import {TypeCongeDto} from "../../../../../../shared/model/conge/type-conge.model";
import {TypeCongeService} from "../../../../../../shared/service/user/conge/type-conge.service";
import {EtatDemandeService} from "../../../../../../shared/service/user/demande/etat-demande.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-demande-conge-edit',
  standalone: true,
    imports: [
        ButtonModule,
        DialogModule,
        DropdownModule,
        PaginatorModule,
        SharedModule
    ],
  templateUrl: './demande-conge-edit.component.html',
  styleUrl: './demande-conge-edit.component.css'
})
export class DemandeCongeEditComponent {

  constructor(private service : DemandeCongeUserService, private typeCongeService : TypeCongeService
    , private etatDemandeService : EtatDemandeService, private messageService: MessageService) {
  }

  public update(item:DemandeCongeDto): void {
    this.service.update(item).subscribe(data => {
      if (data != null) {
        this.items = this.items.filter(obj => obj.id !== item.id);
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
