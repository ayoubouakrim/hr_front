import { Component } from '@angular/core';
import {HoraireAdminService} from "../../../../../../shared/service/admin/presence/horaire-admin.service";
import {HoraireDto} from "../../../../../../shared/model/presence/horaire.model";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService, SharedModule} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-horaire-create',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    MessagesModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './horaire-create.component.html',
  styleUrl: './horaire-create.component.css'
})
export class HoraireCreateComponent {
  constructor(private service: HoraireAdminService,private messageService: MessageService) {

  }

  public save(): void {
    this.service.save().subscribe(data => {
      if (data != null) {
        this.items.push(data);
        this.messageService.add({
          severity:'success',
          summary:'Succès',
          detail:'le horaire a été ajouté avec succès'});
      } else {
        this.messageService.add({
          severity:'error',
          summary:'échec',
          detail:'le horaire n\'a pas été ajouté'});
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
  get item(): HoraireDto {
    return this.service.item;
  }

  set item(value: HoraireDto) {
    this.service.item = value;
  }

  get items(): Array<HoraireDto> {
    return this.service.items;
  }

  set items(value: Array<HoraireDto>) {
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

}
