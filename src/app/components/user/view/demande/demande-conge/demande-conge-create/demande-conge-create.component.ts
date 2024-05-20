import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {SharedModule} from "primeng/api";
import {DemandeCongeUserService} from "../../../../../../shared/service/user/demande/demande-conge-user.service";
import {TypeCongeService} from "../../../../../../shared/service/type-etat/type-conge.service";
import {DemandeCongeDto} from "../../../../../../shared/model/demande/demande-conge.model";
import {TypeCongeDto} from "../../../../../../shared/model/conge/type-conge.model";

@Component({
  selector: 'app-demande-conge-create',
  standalone: true,
    imports: [
        ButtonModule,
        DialogModule,
        DropdownModule,
        PaginatorModule,
        SharedModule
    ],
  templateUrl: './demande-conge-create.component.html',
  styleUrl: './demande-conge-create.component.css'
})
export class DemandeCongeCreateComponent implements OnInit{

  visible: boolean = false;

  constructor(private service : DemandeCongeUserService, private typeCongeService : TypeCongeService) {
  }

  ngOnInit(): void {
    this.typeConge = new TypeCongeDto();
    this.typeCongeService.findAll().subscribe((data) => this.typeConges = data);
  }
  hideCreateDialog() {
    this.visible = false;
  }

  public save(item : DemandeCongeDto): void {
    this.service.save(item).subscribe(data => {
      if (data != null) {
        this.items.push(data);
        alert("OK");
      } else {
        alert("Error");
      }
    });
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

  get typeConge(): TypeCongeDto {
    return this.typeCongeService.item;
  }
  set typeConge(value: TypeCongeDto) {
    this.typeCongeService.item = value;
  }
  get typeConges(): Array<TypeCongeDto> {
    return this.typeCongeService.items;
  }
  set typeConges(value: Array<TypeCongeDto>) {
    this.typeCongeService.items = value;
  }
}
