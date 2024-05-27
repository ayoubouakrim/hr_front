import {Component, OnInit} from '@angular/core';

import {ButtonModule} from "primeng/button";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {CommissionDto} from "../../../../../shared/model/employe/commission.model";
import {CommissionUserService} from "../../../../../shared/service/user/employe/commission-user.service";
import {CommissionViewUserComponent} from "../view/commission-view-user.component";
import {PresenceDto} from "../../../../../shared/model/presence/presence.model";

@Component({
  selector: 'app-commission-list',
  standalone: true,
  imports: [
    ButtonModule,
    SharedModule,
    TableModule,
    CommissionViewUserComponent,

  ],
  templateUrl: './commission-list-user.component.html',
  styleUrl: './commission-list-user.component.css'
})
export class CommissionListUserComponent implements OnInit{
  ngOnInit(): void {
    this.findByEmployeMatricule();
  }
  constructor(private service: CommissionUserService) {
  }

  public findByEmployeMatricule(): void {
    const matricule: string = localStorage.getItem('matricule') as string;
    this.service.findByEmployeMatricule(matricule).subscribe(data => {
      this.items = data.filter(item => !item.archive);
    });
  }

  public view(dto: CommissionDto) {
    this.service.findByCode(dto).subscribe(res => {
      this.item = res;
      this.viewDialog = true;
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

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }
}
