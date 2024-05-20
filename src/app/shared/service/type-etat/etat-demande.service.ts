import { Injectable } from '@angular/core';
import {EtatDemandeDto} from "../../model/demande/etat-demande.model";
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class EtatDemandeService {
  private _item: EtatDemandeDto | undefined;
  private _items: Array<EtatDemandeDto> | undefined;
  private url = 'http://localhost:8089/api/v1/user/etatDemande';
  constructor(private http: HttpClient) { }

  public findAll() {
    return this.http.get<Array<EtatDemandeDto>>(this.url + "/all");
  }
  public findByCode(dto: EtatDemandeDto) {
    return this.http.get<EtatDemandeDto>(this.url + '/find/code/' + dto.code);
  }


  get item(): EtatDemandeDto {
    if(this._item == null){
      this._item = new EtatDemandeDto();
    }
    return this._item;
  }

  set item(value: EtatDemandeDto) {
    this._item = value;
  }

  get items(): Array<EtatDemandeDto>  {
    if(this._items == null){
      this._items = new Array<EtatDemandeDto>();
    }
    return this._items;
  }

  set items(value: Array<EtatDemandeDto> ) {
    this._items = value;
  }
}
