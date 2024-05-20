import { Component } from '@angular/core';
import {AbsenceAdminService} from "../../../../../../shared/service/admin/conge/absence-admin.service";
import {EmployeService} from "../../../../../../shared/service/admin/employe/employe.service";
import {TypeAbsenceAdminService} from "../../../../../../shared/service/admin/conge/type-absence-admin.service";
import {EmployeDto} from "../../../../../../shared/model/employe/employe.model";
import {TypeAbsenceDto} from "../../../../../../shared/model/conge/type-absence.model";
import {AbsenceDto} from "../../../../../../shared/model/conge/absence.model";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {EtatCongeDto} from "../../../../../../shared/model/conge/etat-conge.model";
import {EtatCongeService} from "../../../../../../shared/service/admin/conge/etat-conge.service";

@Component({
  selector: 'app-absence-create',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  templateUrl: './absence-create.component.html',
  styleUrl: './absence-create.component.css'
})
export class AbsenceCreateComponent {
  constructor(private service: AbsenceAdminService, private employeService: EmployeService, private typeService: TypeAbsenceAdminService, private etatService: EtatCongeService) {
    this.employe = new EmployeDto()
    this.employeService.findAll().subscribe((data) => this.employes = data);
    this.type = new TypeAbsenceDto()
    this.typeService.findAll().subscribe((data) => this.types = data);
    this.etat = new EtatCongeDto()
    this.etatService.findAll().subscribe( (data) => this.etats = data);

  }

  public save(): void {
    this.service.save().subscribe(data => {
      if (data != null) {
        alert("OK");
      } else {
        alert("Error");
      }
    });
    this.createDialog = false;
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

  hideCreateDialog() {
    this.createDialog = false;
  }

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
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
}
