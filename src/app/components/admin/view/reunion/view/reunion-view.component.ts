import { Component } from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ReunionDto} from "../../../../../shared/model/reunion/reunion.model";
import {ReunionService} from "../../../../../shared/service/admin/reunion/reunion.service";
import {EmployeService} from "../../../../../shared/service/admin/employe/employe.service";
import {EmployeDto} from "../../../../../shared/model/employe/employe.model";
import {ListboxModule} from "primeng/listbox";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {DepartementDto} from "../../../../../shared/model/departement/departement.model";
import {ReunionEditComponent} from "../edit/reunion-edit.component";
import {NotificationDto} from "../../../../../shared/model/notification/notification.model";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
@Component({
  selector: 'app-reunion-view',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    ListboxModule,
    DropdownModule,
    ButtonModule,
    ReunionEditComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  providers:[ConfirmationService, MessageService],
  templateUrl: './reunion-view.component.html',
  styleUrl: './reunion-view.component.css'
})
export class ReunionViewComponent {
  constructor(private service: ReunionService, private employeService : EmployeService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.employe = new EmployeDto()
    this.employeService.findAll().subscribe((data) => this.employes = data);

  }


  public edit(dto: ReunionDto) {
    this.service.findByItemCode(dto).subscribe(res => {
      this.item = res;
      this.editDialog = true;
    });
  }

  public delete(dto: ReunionDto) {
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimer cet élément ?',
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      accept: () => {
        this.service.delete(dto).subscribe(status => {
          if (status > 0) {
            const position = this.items.indexOf(dto);
            position > -1 ? this.items.splice(position, 1) : false;
            this.messageService.add({
              severity:'success',
              summary:'Succès',
              detail:'supprime succeful'});
          }

        }, error => console.log(error));
        this.viewDialog = false;
      }
    });

  }

  public hideEditDialog () {
    this.editDialog = false;
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
