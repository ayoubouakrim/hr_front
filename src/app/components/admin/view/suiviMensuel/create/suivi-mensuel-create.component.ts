import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {SuiviMensuelService} from "../../../../../shared/service/admin/suiviMensuel/suivi-mensuel.service";
import {EmployeService} from "../../../../../shared/service/admin/employe/employe.service";
import {EmployeDto} from "../../../../../shared/model/employe/employe.model";
import {SuiviMensuelDto} from "../../../../../shared/model/suivi/suivi-mensuel.model";

@Component({
  selector: 'app-suiviMensuel-create',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  templateUrl: './suivi-mensuel-create.component.html',
  styleUrl: './suivi-mensuel-create.component.css'
})
export class SuiviMensuelCreateComponent {
  constructor(private service: SuiviMensuelService, private employeService: EmployeService) {
    this.employe = new EmployeDto()
    this.employeService.findAll().subscribe((data) => this.employes = data);

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
  get item(): SuiviMensuelDto {
    return this.service.item;
  }

  set item(value: SuiviMensuelDto) {
    this.service.item = value;
  }

  get items(): Array<SuiviMensuelDto> {
    return this.service.items;
  }

  set items(value: Array<SuiviMensuelDto>) {
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

}
