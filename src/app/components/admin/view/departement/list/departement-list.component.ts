import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {DepartementService} from "../../../../../shared/service/admin/departement/departement.service";
import {DepartementDto} from "../../../../../shared/model/departement/departement.model";
import {DepartementCreateComponent} from "../create/departement-create.component";
import {DepartementViewComponent} from "../view/departement-view.component";
import {DepartementEditComponent} from "../edit/departement-edit.component";
import {HoraireDto} from "../../../../../shared/model/presence/horaire.model";
import {DatePipe} from "@angular/common";
import {EmployeDto} from "../../../../../shared/model/employe/employe.model";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-departement-list',
  standalone: true,
  imports: [
    ButtonModule,
    SharedModule,
    TableModule,
    DepartementCreateComponent,
    DepartementViewComponent,
    DepartementEditComponent,
    DatePipe,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './departement-list.component.html',
  styleUrl: './departement-list.component.css'
})
export class DepartementListComponent implements OnInit{

  constructor(private service: DepartementService, private confirmationService: ConfirmationService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.findAll();
  }


  public findAll(): void {
    this.service.findAll().subscribe(data => {
      this.items = data.filter(item => !item.archive);
    })
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

  showDialog(): void {
    this.createDialog = true;
  }

  public view(dto: DepartementDto) {
    this.service.findByCode(dto).subscribe(res => {
      this.item = res;
      this.viewDialog = true;
    });
  }
  public edit(dto: DepartementDto) {
    this.service.findByCode(dto).subscribe(res => {
      this.item = res;
      this.editDialog = true;
    });
  }
  public archive(dto: DepartementDto): void {
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
          this.service.archiver(this.item).subscribe(data => {
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
  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }

}
