import {Component} from '@angular/core';
import {DemandeAbsenceDto} from "../../../../../../shared/model/demande/demande-absence.model";
import {DemandeAbsenceUserService} from "../../../../../../shared/service/user/demande/demande-absence-user.service";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-demande-absence-delete',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule
  ],
  templateUrl: './demande-absence-delete.component.html',
  styleUrl: './demande-absence-delete.component.css'
})
export class DemandeAbsenceDeleteComponent {

  constructor(private service : DemandeAbsenceUserService) {
  }

  deletebyCode(){
    this.items = this.items.filter(obj => obj.id !== this.item.id);
    this.service.deleteByCode(this.item).subscribe(nbr => {
      return nbr;
    });
  }

  get deleteDialog(): boolean {
    return this.service.deleteDialog;
  }

  set deleteDialog(value: boolean) {
    this.service.deleteDialog = value;
  }

  hideCreateDialog() {
    this.deleteDialog = false;
  }

  get item(): DemandeAbsenceDto{
    return this.service.item;
  }

  set item(value: DemandeAbsenceDto) {
    this.service.item = value;
  }

  get items(): Array<DemandeAbsenceDto> {
    return this.service.items;
  }

  set items(value: Array<DemandeAbsenceDto>) {
    this.service.items = value;
  }
}
