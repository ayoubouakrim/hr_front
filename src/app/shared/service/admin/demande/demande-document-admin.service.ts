import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {DemandeDocumentDto} from "../../../model/demande/demande-document.model";

@Injectable({
  providedIn: 'root'
})
export class DemandeDocumentAdminService {

  private _item: DemandeDocumentDto | undefined;
  private _items: Array<DemandeDocumentDto> | undefined;
  private url = 'http://localhost:8089/api/v1/admin/demandeDocument';
  protected _editDialog: boolean = false;
  protected _viewDialog: boolean = false;

  constructor(private http: HttpClient) {
  }

  public save(): Observable<DemandeDocumentDto> {
    return this.http.post<DemandeDocumentDto>(this.url + "/add", this.item);
  }
  public findAll() {
    return this.http.get<Array<DemandeDocumentDto>>(this.url + "/all");
  }
  public findByCode(dto: DemandeDocumentDto) {
    return this.http.get<DemandeDocumentDto>(this.url + '/find/code/' + dto.code);
  }
  public delete(dto: DemandeDocumentDto) {
    return this.http.delete<number>(this.url + '/delete/code/' + dto.code);
  }
  public update(): Observable<DemandeDocumentDto> {
    return this.http.put<DemandeDocumentDto>(this.url + '/update', this.item);
  }
  public findByEmployeMatricule(dto: DemandeDocumentDto) {
    return this.http.get<DemandeDocumentDto>(this.url + '/find/employe/matricule/' + dto.employe.matricule);
  }

  public findByTypeAbsenceCode(dto: DemandeDocumentDto) {
    return this.http.get<DemandeDocumentDto>(this.url + '/find/typeDocument/code/' + dto.typeDocument.code);
  }
  public findByEtatDemandeCode(dto: DemandeDocumentDto) {
    return this.http.get<DemandeDocumentDto>(this.url + '/find/etatDemande/code/' + dto.etatDemande.code);
  }

  private _visibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public visible$: Observable<boolean> = this._visibleSubject.asObservable();

  public showDialog(): void {
    this._visibleSubject.next(true);
  }

  public hideDialog(): void {
    this._visibleSubject.next(false);
  }


  get editDialog(): boolean {
    return this._editDialog;
  }

  set editDialog(value: boolean) {
    this._editDialog = value;
  }

  get viewDialog(): boolean {
    return this._viewDialog;
  }

  set viewDialog(value: boolean) {
    this._viewDialog = value;
  }

  get item(): DemandeDocumentDto {
    if(this._item == null){
      this._item=new DemandeDocumentDto();
    }
    return this._item;
  }

  set item(value: DemandeDocumentDto) {
    this._item = value;
  }

  get items(): Array<DemandeDocumentDto> {
    if(this._items == null){
      this._items=new Array<DemandeDocumentDto>();
    }
    return this._items;
  }

  set items(value: Array<DemandeDocumentDto>) {
    this._items = value;
  }
}
