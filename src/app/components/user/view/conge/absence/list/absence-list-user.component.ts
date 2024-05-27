import {Component, OnInit} from '@angular/core';

import {ButtonModule} from "primeng/button";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {AbsenceDto} from "../../../../../../shared/model/conge/absence.model";
import {MessageService, ConfirmationService} from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {AbsenceUserService} from "../../../../../../shared/service/user/conge/absence-user.service";
import {AbsenceViewUserComponent} from "../view/absence-view-user.component";

@Component({
  selector: 'app-absence-list',
  standalone: true,
  imports: [
    ButtonModule,
    SharedModule,
    TableModule,
    MessagesModule,
    ToastModule,
    ConfirmDialogModule,
    AbsenceViewUserComponent,

  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './absence-list-user.component.html',
  styleUrl: './absence-list-user.component.css'
})
export class AbsenceListUserComponent implements OnInit {
  ngOnInit(): void {
    this.findAll();
  }

  constructor(private service: AbsenceUserService, private messageService: MessageService, private confirmationService: ConfirmationService) {
  }


  public findAll(): void {
    this.service.findByEmployeMatricule().subscribe(data => {
      this.items = data;
    })
  }

  get item(): AbsenceDto {
    return this.service.item;
  }

  set item(value: AbsenceDto) {
    this.service.item = value;
  }

  get items(): Array<AbsenceDto> {
    return this.service.items;
  }

  set items(value: Array<AbsenceDto>) {
    this.service.items = value;
  }

  public view(dto: AbsenceDto) {
    this.service.findByCode(dto).subscribe(res => {
      this.item = res;
      this.viewDialog = true;
    });
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }
}
