import {Component, OnInit} from '@angular/core';

import {ButtonModule} from "primeng/button";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {CommissionAdminService} from "../../../../../../shared/service/admin/employe/commission.service";
import {CommissionDto} from "../../../../../../shared/model/employe/commission.model";




@Component({
  selector: 'app-commission-list',
  standalone: true,
  imports: [
    ButtonModule,
    SharedModule,
    TableModule,

  ],
  templateUrl: './commission-notification-suivi-mensuel-list.component.html',
  styleUrl: './commission-notification-suivi-mensuel-list.component.css'
})
export class CommissionListComponent implements OnInit{
  ngOnInit(): void {
    this.findAll();
  }
  constructor(private service: CommissionAdminService) {
  }



  public findAll(): void {
    this.service.findAll().subscribe(data => {
      this.items = data;
    })
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
