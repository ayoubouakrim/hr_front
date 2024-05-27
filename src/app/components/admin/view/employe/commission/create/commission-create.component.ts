import { Component } from '@angular/core';
import {EmployeService} from "../../../../../../shared/service/admin/employe/employe.service";
import {EmployeDto} from "../../../../../../shared/model/employe/employe.model";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService, SharedModule} from "primeng/api";
import {CommissionAdminService} from "../../../../../../shared/service/admin/employe/commission.service";
import {CommissionDto} from "../../../../../../shared/model/employe/commission.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-commission-create',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './commission-create.component.html',
  styleUrl: './commission-create.component.css'
})
export class CommissionCreateComponent {
  constructor(private service: CommissionAdminService, private employeService: EmployeService, private messageService: MessageService) {
    this.employe = new EmployeDto()
    this.employeService.findAll().subscribe((data) => this.employes = data);

  }

  public save(): void {
    this.service.save().subscribe(data => {
      if (data != null) {
        this.items.push(data);
        this.messageService.add({
          severity:'success',
          summary:'Succès',
          detail:'la commission a été ajouté avec succès'});
      } else {
        this.messageService.add({
          severity:'error',
          summary:'échec',
          detail:'la commission n\'a pas été ajouté'});
      }

    }, (error: HttpErrorResponse) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: `Une erreur est survenue`
      });
    });
    this.createDialog = false;
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
