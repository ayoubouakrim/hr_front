import {Component} from '@angular/core';
import {DemandeAbsenceUserService} from "../../../../../../shared/service/user/demande/demande-absence-user.service";
import {DemandeAbsenceDto} from "../../../../../../shared/model/demande/demande-absence.model";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService, SharedModule} from "primeng/api";
import {EtatDemandeDto} from "../../../../../../shared/model/demande/etat-demande.model";
import {TypeAbsenceDto} from "../../../../../../shared/model/conge/type-absence.model";
import {DatePipe} from "@angular/common";
import {EtatDemandeService} from "../../../../../../shared/service/user/demande/etat-demande.service";
import {TypeAbsenceService} from "../../../../../../shared/service/user/conge/type-absence.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-demande-absence-edit',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    DatePipe
  ],
  providers: [MessageService],
  templateUrl: './demande-absence-edit.component.html',
  styleUrl: './demande-absence-edit.component.css'
})
export class DemandeAbsenceEditComponent {

  constructor(private service : DemandeAbsenceUserService, private typeAbsenceService : TypeAbsenceService
  , private etatDemandeService : EtatDemandeService, private messageService: MessageService) {
  }

  public update(item : DemandeAbsenceDto): void {
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
