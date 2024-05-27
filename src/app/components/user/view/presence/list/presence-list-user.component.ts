import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {PresenceUserService} from "../../../../../shared/service/user/presence/presence-user.service";
import {PresenceDto} from "../../../../../shared/model/presence/presence.model";
import {PresenceViewComponent} from "../view/presence-view.component";

@Component({
  selector: 'app-presence-list',
  standalone: true,
  imports: [
    ButtonModule,
    SharedModule,
    TableModule,
    PresenceViewComponent
  ],
  templateUrl: './presence-list-user.component.html',
  styleUrl: './presence-list-user.component.css'
})
export class PresenceListUserComponent implements OnInit{
  constructor(private service: PresenceUserService) {
  }

  ngOnInit(): void {
    this.findByEmployeMatricule();
  }


  public findByEmployeMatricule(): void {
    this.service.findByEmployeMatricule().subscribe(data => {
      this.items = data;
    })
  }

  parseDate(dateArray: number[] | any): string {
    if(dateArray) {
      if (dateArray || Array.isArray(dateArray) || dateArray.length == 3) {
        const [hours = 0, minutes = 0, seconds = 0] = dateArray;
        const formattedHours = this.padWithZero(hours);
        const formattedMinutes = this.padWithZero(minutes);
        const formattedSeconds = this.padWithZero(seconds);
        const formattedDate = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        return formattedDate;
      }else{
        return "";
      }
    }else{
      return "";
    }
  }

  padWithZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  get item(): PresenceDto {
    return this.service.item;
  }

  set item(value: PresenceDto) {
    this.service.item = value;
  }

  get items(): Array<PresenceDto> {
    return this.service.items;
  }

  set items(value: Array<PresenceDto>) {
    this.service.items = value;
  }

  public view(dto: PresenceDto) {
    this.service.findById(dto).subscribe(res => {
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
