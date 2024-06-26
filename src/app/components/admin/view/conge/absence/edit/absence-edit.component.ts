import {Component, OnInit} from '@angular/core';
import {EmployeDto} from "../../../../../../shared/model/employe/employe.model";
import {AbsenceAdminService} from "../../../../../../shared/service/admin/conge/absence-admin.service";
import {EmployeService} from "../../../../../../shared/service/admin/employe/employe.service";
import {TypeAbsenceDto} from "../../../../../../shared/model/conge/type-absence.model";
import {AbsenceDto} from "../../../../../../shared/model/conge/absence.model";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {EtatCongeDto} from "../../../../../../shared/model/conge/etat-conge.model";
import {EtatCongeService} from "../../../../../../shared/service/admin/conge/etat-conge.service";
import {TypeAbsenceService} from "../../../../../../shared/service/admin/conge/type-absence.service";

@Component({
  selector: 'app-absence-edit',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  templateUrl: './absence-edit.component.html',
  styleUrl: './absence-edit.component.css'
})
export class AbsenceEditComponent implements OnInit{

  constructor(private service: AbsenceAdminService, private employeService: EmployeService, private typeService: TypeAbsenceService,  private etatService: EtatCongeService) {

  }
  ngOnInit(): void {
    this.employe = new EmployeDto();
    this.employeService.findAll().subscribe((data) => this.employes = data);
    this.type = new TypeAbsenceDto();
    this.typeService.findAll().subscribe((data) => this.types = data);
    this.etat = new EtatCongeDto()
    this.etatService.findAll().subscribe( (data) => this.etats = data);

  }

  public update(): void {
    this.service.update().subscribe(data => {
      if (data != null) {
        alert("OK");
      } else {
        alert("Error");
      }
    });
  }

  hideCreateDialog() {
    this.editDialog = false;
  }

  get item(): AbsenceDto {
    return this.service.item;
  }

  set item(value: AbsenceDto) {
    this.service.item = value;
  }

  get items(): Array<AbsenceDto> {
    return this.service.items;
  }

  set items(value: Array<AbsenceDto>) {
    this.service.items = value;
  }

  get employe(): EmployeDto {
    return this.employeService.item;
  }

  set employe(value: EmployeDto) {
    this.employeService.item = value;
  }

  get employes(): Array<EmployeDto> {
    return this.employeService.items;
  }

  set employes(value: Array<EmployeDto>) {
    this.employeService.items = value;
  }

  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
  }

  get etat(): EtatCongeDto {
    return this.etatService.item;
  }

  set etat(value: EtatCongeDto) {
    this.etatService.item = value;
  }

  get etats(): Array<EtatCongeDto> {
    return this.etatService.items;
  }

  set etats(value: Array<EtatCongeDto>) {
    this.etatService.items = value;
  }
  get type(): TypeAbsenceDto {
    return this.typeService.item;
  }

  set type(value: TypeAbsenceDto) {
    this.typeService.item = value;
  }

  get types(): Array<TypeAbsenceDto> {
    return this.typeService.items;
  }

  set types(value: Array<TypeAbsenceDto>) {
    this.typeService.items = value;
  }

}
