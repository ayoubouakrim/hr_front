import { Component } from '@angular/core';
import {CongeAdminService} from "../../../../../../shared/service/admin/conge/conge-admin.service";
import {EmployeService} from "../../../../../../shared/service/admin/employe/employe.service";
import {EmployeDto} from "../../../../../../shared/model/employe/employe.model";
import {TypeCongeDto} from "../../../../../../shared/model/conge/type-conge.model";
import {CongeDto} from "../../../../../../shared/model/conge/conge.model";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService, SharedModule} from "primeng/api";
import {EtatCongeService} from "../../../../../../shared/service/admin/conge/etat-conge.service";
import {EtatCongeDto} from "../../../../../../shared/model/conge/etat-conge.model";
import {ToastModule} from "primeng/toast";
import {MessagesModule} from "primeng/messages";
import {HttpErrorResponse} from "@angular/common/http";
import {TypeCongeService} from "../../../../../../shared/service/admin/conge/type-conge.service";

@Component({
  selector: 'app-conge-create',
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
  templateUrl: './conge-create.component.html',
  styleUrl: './conge-create.component.css'
})
export class CongeCreateComponent {


  constructor(private service: CongeAdminService, private employeService: EmployeService, private typeService: TypeCongeService, private etatService: EtatCongeService,  private messageService: MessageService) {

    this.employe = new EmployeDto()
    this.employeService.findAll().subscribe((data) => this.employes = data);
    this.type = new TypeCongeDto()
    this.typeService.findAll().subscribe((data) => this.types = data);
    this.etat = new EtatCongeDto()
    this.etatService.findAll().subscribe( (data) => this.etats = data);

  }

  public save(): void {
    this.service.save().subscribe(data => {
      if (data != null) {
        this.items.push(data)
        this.messageService.add({
          severity:'success',
          summary:'Succès',
          detail:'le Congé a été ajouté avec succès'});
      } else {
        this.messageService.add({
          severity:'error',
          summary:'échec',
          detail:'le conge n\'a pas été ajouté'});
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
  get item(): CongeDto {
    return this.service.item;
  }

  set item(value: CongeDto) {
    this.service.item = value;
  }

  get items(): Array<CongeDto> {
    return this.service.items;
  }

  set items(value: Array<CongeDto>) {
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

  get etat(): EtatCongeDto {
    return this.etatService.item;
  }

  set etat(value: EtatCongeDto) {
    this.etatService.item = value;
  }

  get etats(): Array<EtatCongeDto> {
    return this.etatService.items;
  }

  set etats(value: Array<EtatCongeDto>) {
    this.etatService.items = value;
  }
  get type(): TypeCongeDto {
    return this.typeService.item;
  }

  set type(value: TypeCongeDto) {
    this.typeService.item = value;
  }

  get types(): Array<TypeCongeDto> {
    return this.typeService.items;
  }

  set types(value: Array<TypeCongeDto>) {
    this.typeService.items = value;
  }
}
