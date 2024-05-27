import {Component, OnInit} from '@angular/core';

import {ButtonModule} from "primeng/button";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {CongeDto} from "../../../../../../shared/model/conge/conge.model";
import { MessageService, ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {CongeUserService} from "../../../../../../shared/service/user/conge/conge-user.service";
import {CongeViewUserComponent} from "../view/conge-view-user.component";
import {AbsenceDto} from "../../../../../../shared/model/conge/absence.model";




@Component({
  selector: 'app-conge-list',
  standalone: true,
  imports: [
    ButtonModule,
    SharedModule,
    TableModule,
    MessagesModule,
    ToastModule,
    ConfirmDialogModule,
    CongeViewUserComponent,

  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './conge-list-user.component.html',
  styleUrl: './conge-list-user.component.css'
})
export class CongeListUserComponent implements OnInit{
  ngOnInit(): void {
    this.findAll();
  }
  constructor(private service: CongeUserService) {
  }



  public findAll(): void {
    this.service.findByEmployeMatricule().subscribe(data => {
      this.items = data;
    })
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
