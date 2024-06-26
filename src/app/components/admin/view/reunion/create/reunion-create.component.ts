import { Component } from '@angular/core';
import {ReunionDto} from "../../../../../shared/model/reunion/reunion.model";
import {ReunionService} from "../../../../../shared/service/admin/reunion/reunion.service";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {PaginatorModule} from "primeng/paginator";
import {MessageService, SharedModule} from "primeng/api";
import {MultiSelectModule} from "primeng/multiselect";
import {EmployeDto} from "../../../../../shared/model/employe/employe.model";
import {EmployeService} from "../../../../../shared/service/admin/employe/employe.service";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";
import {HttpErrorResponse} from "@angular/common/http";



@Component({
  selector: 'app-reunion-create',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    PaginatorModule,
    SharedModule,
    MultiSelectModule,
    MessagesModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './reunion-create.component.html',
  styleUrl: './reunion-create.component.css'
})
export class ReunionCreateComponent {


  constructor(private service: ReunionService, private employeService: EmployeService, private messageService: MessageService) {
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
          detail:'la réunion a été ajouté avec succès'});
      } else {
        this.messageService.add({
          severity:'error',
          summary:'échec',
          detail:'la réunion n\'a pas été ajouté'});
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
