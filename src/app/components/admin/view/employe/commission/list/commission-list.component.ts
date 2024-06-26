import {Component, OnInit} from '@angular/core';

import {ButtonModule} from "primeng/button";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {CommissionAdminService} from "../../../../../../shared/service/admin/employe/commission.service";
import {CommissionDto} from "../../../../../../shared/model/employe/commission.model";
import {CongeCreateComponent} from "../../../conge/conge/create/conge-create.component";
import {CongeEditComponent} from "../../../conge/conge/edit/conge-edit.component";
import {CongeViewComponent} from "../../../conge/conge/view/conge-view.component";
import {CommissionCreateComponent} from "../create/commission-create.component";
import {CommissionViewComponent} from "../view/commission-view.component";
import {CommissionEditComponent} from "../edit/commission-edit.component";
import {EmployeDto} from "../../../../../../shared/model/employe/employe.model";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputTextModule} from "primeng/inputtext";




@Component({
  selector: 'app-commission-list',
  standalone: true,
  imports: [
    ButtonModule,
    SharedModule,
    TableModule,
    CongeCreateComponent,
    CongeEditComponent,
    CongeViewComponent,
    CommissionCreateComponent,
    CommissionViewComponent,
    CommissionEditComponent,
    MessagesModule,
    ToastModule,
    ConfirmDialogModule,
    InputTextModule,

  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './commission-list.component.html',
  styleUrl: './commission-list.component.css'
})
export class CommissionListComponent implements OnInit{
  ngOnInit(): void {
    this.findAll();
  }
  constructor(private service: CommissionAdminService, private messageService: MessageService, private confirmationService: ConfirmationService) {
  }



  public findAll(): void {
    this.service.findAll().subscribe(data => {
      // Filter items where archive is false
      this.items = data.filter(item => !item.archive);
    });
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

  showDialog(): void {
    this.item = new CommissionDto();
    this.createDialog = true;
  }
  public view(dto: CommissionDto) {
    this.service.findByCode(dto).subscribe(res => {
      this.item = res;
      this.viewDialog = true;
    });
  }
  public edit(dto: CommissionDto) {
    this.service.findByCode(dto).subscribe(res => {
      this.item = res;
      this.editDialog = true;
    });
  }
  public archive(dto: CommissionDto): void {
    this.confirmationService.confirm({
      message: 'Voulez-vous archiver cet élément ?',
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      accept: () => {
        this.service.findByCode(dto).subscribe(res => {
          this.item = res;

          // Update the item with archive set to true
          this.item.archive = true;

          // Call the service to update the item
          this.service.updatePar(this.item).subscribe(data => {
            if (data != null) {
              const position = this.items.indexOf(dto);
              position > -1 ? this.items.splice(position, 1) : false;
              this.messageService.add({
                severity:'success',
                summary:'Succès',
                detail:'archivé avec succès'});
            } else {
              alert("Error");
            }
          });
        });
      }
    });

  }

  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }
  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }
}
