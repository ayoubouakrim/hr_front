import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService, SharedModule} from "primeng/api";
import {DemandeAbsenceUserService} from "../../../../../../shared/service/user/demande/demande-absence-user.service";
import {DemandeAbsenceDto} from "../../../../../../shared/model/demande/demande-absence.model";
import {TypeAbsenceDto} from "../../../../../../shared/model/conge/type-absence.model";
import {TypeAbsenceService} from "../../../../../../shared/service/user/conge/type-absence.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-demande-absence-create',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  templateUrl: './demande-absence-create.component.html',
  styleUrl: './demande-absence-create.component.css'
})
export class DemandeAbsenceCreateComponent implements OnInit{


  matricule:string = "";

  constructor(private service : DemandeAbsenceUserService, private typeAbsenceService : TypeAbsenceService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.typeAbsence = new TypeAbsenceDto();
    this.typeAbsenceService.findAll().subscribe((data) => this.typeAbsences = data);
  }

  hideCreateDialog() {
    this.createDialog = false;
  }

  public save(item : DemandeAbsenceDto): void {
    this.matricule = localStorage.getItem('matricule') as string;
    item.employe.matricule = this.matricule;
    this.service.save(item).subscribe(data => {
      if (data != null) {
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

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
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
}
