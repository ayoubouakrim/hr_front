import {Component, OnInit} from '@angular/core';
import {EmployeDto} from "../../../../../../shared/model/employe/employe.model";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {CommissionAdminService} from "../../../../../../shared/service/admin/employe/commission.service";
import {EmployeService} from "../../../../../../shared/service/admin/employe/employe.service";
import {CommissionDto} from "../../../../../../shared/model/employe/commission.model";

@Component({
  selector: 'app-commission-edit',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  templateUrl: './commission-edit.component.html',
  styleUrl: './commission-edit.component.css'
})
export class CommissionEditComponent implements OnInit{
  constructor(private service: CommissionAdminService, private employeService: EmployeService) {
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

  get item(): CommissionDto {
    return this.service.item;
  }

  set item(value: CommissionDto) {
    this.service.item = value;
  }

  get items(): Array<CommissionDto> {
    return this.service.items;
  }

  set items(value: Array<CommissionDto>) {
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
