import { Component } from '@angular/core';
import {CongeAdminService} from "../../../../../../shared/service/admin/conge/conge-admin.service";
import {EmployeService} from "../../../../../../shared/service/admin/employe/employe.service";
import {TypeCongeAdminService} from "../../../../../../shared/service/admin/conge/type-conge-admin.service";
import {EmployeDto} from "../../../../../../shared/model/employe/employe.model";
import {TypeCongeDto} from "../../../../../../shared/model/conge/type-conge.model";
import {CongeDto} from "../../../../../../shared/model/conge/conge.model";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";

@Component({
  selector: 'app-conge-create',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  templateUrl: './conge-create.component.html',
  styleUrl: './conge-create.component.css'
})
export class CongeCreateComponent {
  constructor(private service: CongeAdminService, private employeService: EmployeService, private typeService: TypeCongeAdminService) {
    this.employe = new EmployeDto()
    this.employeService.findAll().subscribe((data) => this.employes = data);
    this.type = new TypeCongeDto()
    this.typeService.findAll().subscribe((data) => this.types = data);

  }

  public save(): void {
    this.service.save().subscribe(data => {
      if (data != null) {
        alert("OK");
      } else {
        alert("Error");
      }
    });
  }
  get item(): CongeDto {
    return this.service.item;
  }

  set item(value: CongeDto) {
    this.service.item = value;
  }

  get items(): Array<CongeDto> {
    return this.service.items;
  }

  set items(value: Array<CongeDto>) {
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
  get type(): TypeCongeDto {
    return this.typeService.item;
  }

  set type(value: TypeCongeDto) {
    this.typeService.item = value;
  }

  get types(): Array<TypeCongeDto> {
    return this.typeService.items;
  }

  set types(value: Array<TypeCongeDto>) {
    this.typeService.items = value;
  }
}
