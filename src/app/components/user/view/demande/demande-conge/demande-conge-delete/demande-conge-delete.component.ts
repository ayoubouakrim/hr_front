import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {SharedModule} from "primeng/api";
import {DemandeCongeUserService} from "../../../../../../shared/service/user/demande/demande-conge-user.service";
import {DemandeCongeDto} from "../../../../../../shared/model/demande/demande-conge.model";

@Component({
  selector: 'app-demande-conge-delete',
  standalone: true,
    imports: [
        ButtonModule,
        DialogModule,
        SharedModule
    ],
  templateUrl: './demande-conge-delete.component.html',
  styleUrl: './demande-conge-delete.component.css'
})
export class DemandeCongeDeleteComponent {

constructor(private service : DemandeCongeUserService) {
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

  get item(): DemandeCongeDto{
    return this.service.item;
  }

  set item(value: DemandeCongeDto) {
    this.service.item = value;
  }

  get items(): Array<DemandeCongeDto> {
    return this.service.items;
  }

  set items(value: Array<DemandeCongeDto>) {
    this.service.items = value;
  }
}
