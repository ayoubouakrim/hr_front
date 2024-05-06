import { Component } from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ReunionDto} from "../../../../../shared/model/reunion/reunion.model";
import {ReunionService} from "../../../../../shared/service/admin/reunion/reunion.service";
import {EmployeService} from "../../../../../shared/service/admin/employe/employe.service";
import {EmployeDto} from "../../../../../shared/model/employe/employe.model";
import {ListboxModule} from "primeng/listbox";
import {DropdownModule} from "primeng/dropdown";
@Component({
  selector: 'app-reunion-view',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    ListboxModule,
    DropdownModule
  ],
  templateUrl: './reunion-view.component.html',
  styleUrl: './reunion-view.component.css'
})
export class ReunionViewComponent {
  constructor(private service: ReunionService, private employeService : EmployeService) {
    this.employe = new EmployeDto()
    this.employeService.findAll().subscribe((data) => this.employes = data);

  }

  get item(): ReunionDto {
    return this.service.item;
  }

  set item(value: ReunionDto) {
    this.service.item = value;
  }

  get items(): Array<ReunionDto> {
    return this.service.items;
  }

  set items(value: Array<ReunionDto>) {
    this.service.items = value;
  }



  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
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

}
