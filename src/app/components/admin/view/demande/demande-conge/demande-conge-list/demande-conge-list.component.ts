import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {DemandeCongeAdminService} from "../../../../../../shared/service/admin/demande/demande-conge-admin.service";
import {DemandeCongeViewComponent} from "../demande-conge-view/demande-conge-view.component";
import {TypeCongeService} from "../../../../../../shared/service/type-etat/type-conge.service";
import {EtatDemandeService} from "../../../../../../shared/service/type-etat/etat-demande.service";
import {DemandeCongeDto} from "../../../../../../shared/model/demande/demande-conge.model";
import {TypeCongeDto} from "../../../../../../shared/model/conge/type-conge.model";
import {EtatDemandeDto} from "../../../../../../shared/model/demande/etat-demande.model";

@Component({
  selector: 'app-demande-conge-list',
  standalone: true,
  imports: [
    ButtonModule,
    SharedModule,
    TableModule,
    DemandeCongeViewComponent,
  ],
  templateUrl: './demande-conge-list.component.html',
  styleUrl: './demande-conge-list.component.css'
})
export class DemandeCongeListAdminComponent implements OnInit{

  constructor(private service : DemandeCongeAdminService, private typeCongeService : TypeCongeService
    , private etatDemandeService : EtatDemandeService ) {
  }

  public view(dto: DemandeCongeDto) {
    this.service.findByCode(dto).subscribe(res => {
      this.item = res;
      this.viewDialog = true;
    });
  }
  public edit(dto: DemandeCongeDto) {
    this.service.findByCode(dto).subscribe(res => {
      this.item = res;
      this.editDialog = true;
    });
  }

  ngOnInit(): void {
    this.findAll();
  }

  public findAll(): void {
    this.service.findAll().subscribe(data => {
      this.items = data;
    })
  }

  showDialog(): void {
    this.service.showDialog();
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

  get etatDemande(): EtatDemandeDto {
    return this.etatDemandeService.item;
  }
  set etatDemande(value: EtatDemandeDto) {
    this.etatDemandeService.item = value;
  }
  get etatDemandes(): Array<EtatDemandeDto> {
    return this.etatDemandeService.items;
  }
  set etatDemandes(value: Array<EtatDemandeDto>) {
    this.etatDemandeService.items = value;
  }
}
