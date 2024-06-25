import {Component, OnInit} from '@angular/core';
import {ReunionService} from "../../../../../shared/service/admin/reunion/reunion.service";
import {EmployeService} from "../../../../../shared/service/admin/employe/employe.service";
import {MessageService, SharedModule} from "primeng/api";
import {EmployeDto} from "../../../../../shared/model/employe/employe.model";
import {ReunionDto} from "../../../../../shared/model/reunion/reunion.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {MultiSelectModule} from "primeng/multiselect";
import {PaginatorModule} from "primeng/paginator";
import {ToastModule} from "primeng/toast";
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-reunion-edit',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    MultiSelectModule,
    PaginatorModule,
    SharedModule,
    ToastModule,
    FormsModule
  ],
  providers: [MessageService],
  templateUrl: './reunion-edit.component.html',
  styleUrl: './reunion-edit.component.css'
})
export class ReunionEditComponent{

  constructor(private service: ReunionService, private employeService: EmployeService, private messageService: MessageService) {
    this.employe = new EmployeDto()
    this.employeService.findAll().subscribe((data) => this.employes = data);


  }


  public update(): void {
    this.service.update().subscribe(data => {
      if (data != null) {
        this.items.push(data);
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'la réunion a été édité avec succès'
        });
        this.hideEditDialog()
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'échec',
          detail: 'la réunion n\'a pas été éditer'
        });
      }
    }, (error: HttpErrorResponse) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: `Une erreur est survenue`
      });
    });
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

  hideEditDialog() {
    this.editDialog = false;
  }

  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
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
