import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {SharedModule} from "primeng/api";
import {DemandeDocumentUserService} from "../../../../../../shared/service/user/demande/demande-document-user.service";
import {TypeDocumentService} from "../../../../../../shared/service/type-etat/type-document.service";
import {TypeDocumentDto} from "../../../../../../shared/model/demande/type-document.model";
import {DemandeDocumentDto} from "../../../../../../shared/model/demande/demande-document.model";


@Component({
  selector: 'app-demande-document-create',
  standalone: true,
    imports: [
        ButtonModule,
        DialogModule,
        DropdownModule,
        PaginatorModule,
        SharedModule
    ],
  templateUrl: './demande-document-create.component.html',
  styleUrl: './demande-document-create.component.css'
})
export class DemandeDocumentCreateComponent implements OnInit{

  visible: boolean = false;

  constructor(private service : DemandeDocumentUserService, private typeDocumentService : TypeDocumentService) {
    this.service.visible$.subscribe((visible: boolean) => {
      this.visible = visible;
    });
  }

  ngOnInit(): void {
    this.typeDocument = new TypeDocumentDto();
    this.typeDocumentService.findAll().subscribe((data) => this.typeDocuments = data);
  }
  hideCreateDialog() {
    this.visible = false;
  }

  public save(): void {
    this.service.save().subscribe(data => {
      if (data != null) {
        this.items.push(data);
        alert("OK");
      } else {
        alert("Error");
      }
    });
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

}
