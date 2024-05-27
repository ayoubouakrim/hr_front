import {Component} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ReunionDto} from "../../../../../shared/model/reunion/reunion.model";
import {ListboxModule} from "primeng/listbox";
import {DropdownModule} from "primeng/dropdown";
import {ReunionUserService} from "../../../../../shared/service/user/reunion/reunion-user.service";
import {DatePipe} from "@angular/common";
@Component({
  selector: 'app-reunion-view',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    ListboxModule,
    DropdownModule,
    DatePipe
  ],
  templateUrl: './reunion-view.component.html',
  styleUrl: './reunion-view.component.css'
})
export class ReunionViewComponent {

  constructor(private service: ReunionUserService) {
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
}
