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
import {EmployeUserService} from "../../../../../../shared/service/user/employe/employe-user.service";
import {EmployeDto} from "../../../../../../shared/model/employe/employe.model";

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
  providers: [MessageService],
  templateUrl: './demande-absence-create.component.html',
  styleUrl: './demande-absence-create.component.css'
})
export class DemandeAbsenceCreateComponent implements OnInit{

  private employe: EmployeDto = new EmployeDto();
  protected matricule = localStorage.getItem('matricule');

  constructor(private service : DemandeAbsenceUserService, private typeAbsenceService : TypeAbsenceService, private messageService: MessageService, private employeService: EmployeUserService) {

  }

  ngOnInit(): void {
    this.typeAbsence = new TypeAbsenceDto();
    this.typeAbsenceService.findAll().subscribe((data) => this.typeAbsences = data);
    this.findProfile(this.matricule as string)
  }

  public findProfile(matricule: String){
    this.employeService.findProfile(matricule).subscribe(res => {
      this.employe = res
      console.log(this.item);
    });
  }
  hideCreateDialog() {
    this.createDialog = false;
  }

  public save(item : DemandeAbsenceDto): void {
    item.employe = this.employe;
    this.service.save(item).subscribe(data => {
      if (data != null) {
        this.messageService.add({
          severity:'success',
          summary:'Succès',
          detail:'l\'absence a été ajouté avec succès'});
        this.items.push(data);
      } else {
        this.messageService.add({
          severity:'error',
          summary:'échec',
          detail:'l\'absence n\'a pas été ajouté'});
      }
    }, (error: HttpErrorResponse) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: `Une erreur est survenue`
      });
    });
    this.hideCreateDialog();
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
