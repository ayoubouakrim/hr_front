import {Component, OnInit} from '@angular/core';
import {EmployeService} from "../../../../../../shared/service/admin/employe/employe.service";
import {EmployeDto} from "../../../../../../shared/model/employe/employe.model";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {EmployeCreateComponent} from "../create/employe-create.component";
import {EmployeViewComponent} from "../view/employe-view.component";
import {EmployeEditComponent} from "../edit/employe-edit.component";
import { MessageService, ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  selector: 'app-employe-list',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    EmployeCreateComponent,
    EmployeViewComponent,
    EmployeEditComponent,
    MessagesModule,
    ToastModule,
    ConfirmDialogModule,

  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './employe-list.component.html',
  styleUrl: './employe-list.component.css'
})
export class EmployeListComponent implements OnInit{
  ngOnInit(): void {
    this.findAll();
  }
  constructor(private service: EmployeService, private messageService: MessageService, private confirmationService: ConfirmationService) {
  }

  public findAll(): void {
    this.service.findAll().subscribe(data => {
      // Filter items where archive is false
      this.items = data.filter(item => !item.archive);
    });
  }

  get item(): EmployeDto {
    return this.service.item;
  }

  set item(value: EmployeDto) {
    this.service.item = value;
  }

  get items(): Array<EmployeDto> {
    return this.service.items;
  }

  set items(value: Array<EmployeDto>) {
    this.service.items = value;
  }

  showDialog(): void {
    this.item = new EmployeDto();
    this.createDialog = true;
  }

  public view(dto: EmployeDto) {
    this.service.findByMatricule(dto).subscribe(res => {
      this.item = res;
      this.viewDialog = true;
    });
  }
  public edit(dto: EmployeDto) {
    this.service.findByMatricule(dto).subscribe(res => {
      this.item = res;
      this.editDialog = true;
    });
  }
  public archive(dto: EmployeDto): void {
    this.confirmationService.confirm({
      message: 'Voulez-vous archiver cet élément ?',
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      accept: () => {
        this.service.findByMatricule(dto).subscribe(res => {
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
