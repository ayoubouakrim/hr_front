import {Component, OnInit} from '@angular/core';
import {EmployeDto} from "../../../../../../shared/model/employe/employe.model";
import {CongeAdminService} from "../../../../../../shared/service/admin/conge/conge-admin.service";
import {EmployeService} from "../../../../../../shared/service/admin/employe/employe.service";
import {TypeCongeAdminService} from "../../../../../../shared/service/admin/conge/type-conge-admin.service";
import {TypeCongeDto} from "../../../../../../shared/model/conge/type-conge.model";
import {CongeDto} from "../../../../../../shared/model/conge/conge.model";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";

@Component({
  selector: 'app-conge-edit',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  templateUrl: './conge-edit.component.html',
  styleUrl: './conge-edit.component.css'
})
export class CongeEditComponent implements OnInit{
  constructor(private service: CongeAdminService, private employeService: EmployeService, private typeService: TypeCongeAdminService) {
  }
  ngOnInit(): void {
    this.employe = new EmployeDto();
    this.employeService.findAll().subscribe((data) => this.employes = data);
    this.type = new TypeCongeDto();
    this.typeService.findAll().subscribe((data) => this.types = data);
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
