import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {SharedModule} from "primeng/api";
import {DepartementService} from "../../../../../shared/service/admin/departement/departement.service";
import {EmployeService} from "../../../../../shared/service/admin/employe/employe.service";
import {DepartementDto} from "../../../../../shared/model/departement/departement.model";
import {EmployeDto} from "../../../../../shared/model/employe/employe.model";


@Component({
  selector: 'app-departement-edit',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    PaginatorModule,
    SharedModule
  ],
  templateUrl: './departement-edit.component.html',
  styleUrl: './departement-edit.component.css'
})
export class DepartementEditComponent implements OnInit {
  constructor(private service: DepartementService, private employeService: EmployeService) {
  }

  ngOnInit(): void {
    this.employe = new EmployeDto();
    this.employeService.findAll().subscribe((data) => this.employes = data);
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

  get item(): DepartementDto {
    return this.service.item;
  }

  set item(value: DepartementDto) {
    this.service.item = value;
  }

  get items(): Array<DepartementDto> {
    return this.service.items;
  }

  set items(value: Array<DepartementDto>) {
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

}
