import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {DemandeDocumentViewComponent} from "../demande-document-view/demande-document-view.component";
import {
  DemandeDocumentAdminService
} from "../../../../../../shared/service/admin/demande/demande-document-admin.service";
import {DemandeDocumentDto} from "../../../../../../shared/model/demande/demande-document.model";
import {TypeDocumentDto} from "../../../../../../shared/model/demande/type-document.model";
import {EtatDemandeDto} from "../../../../../../shared/model/demande/etat-demande.model";
import {TypeDocumentService} from "../../../../../../shared/service/admin/demande/type-document.service";
import {EtatDemandeService} from "../../../../../../shared/service/admin/demande/etat-demande.service";


@Component({
  selector: 'app-demande-document-list',
  standalone: true,
  imports: [
    ButtonModule,
    SharedModule,
    TableModule,
    DemandeDocumentViewComponent
  ],
  templateUrl: './demande-document-list.component.html',
  styleUrl: './demande-document-list.component.css'
})
export class DemandeDocumentListAdminComponent implements OnInit{

  constructor(private service : DemandeDocumentAdminService, private typeDocumentService : TypeDocumentService
    , private etatDemandeService : EtatDemandeService ) {
  }

  public view(dto: DemandeDocumentDto) {
    this.service.findByCode(dto).subscribe(res => {
      this.item = res;
      this.viewDialog = true;
    });
  }
  public edit(dto: DemandeDocumentDto) {
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

  get item(): DemandeDocumentDto{
    return this.service.item;
  }

  set item(value: DemandeDocumentDto) {
    this.service.item = value;
  }

  get items(): Array<DemandeDocumentDto> {
    return this.service.items;
  }

  set items(value: Array<DemandeDocumentDto>) {
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

  get typeDocument(): TypeDocumentDto {
    return this.typeDocumentService.item;
  }
  set typeDocument(value: TypeDocumentDto) {
    this.typeDocumentService.item = value;
  }
  get typeDocuments(): Array<TypeDocumentDto> {
    return this.typeDocumentService.items;
  }
  set typeDocuments(value: Array<TypeDocumentDto>) {
    this.typeDocumentService.items = value;
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
