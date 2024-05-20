import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {PostDto} from "../../../model/employe/post.model";


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _item: PostDto | undefined;
  private _items: Array<PostDto> | undefined;
  private url = 'http://localhost:8089/api/v1/admin/post';
  constructor(private http: HttpClient) {

  }
  public save(): Observable<PostDto> {
    return this.http.post<PostDto>(this.url + "/add", this.item);
  }
  public findAll() {
    return this.http.get<Array<PostDto>>(this.url + "/all");
  }
  public delete(dto: PostDto) {
    return this.http.delete<number>(this.url + '/libelle/' + dto.libelle);
  }
  get item(): PostDto {
    if (this._item == null) {
      this._item = new PostDto();
    }
    return this._item;
  }

  set item(value: PostDto) {
    this._item = value;
  }

  get items(): Array<PostDto> {
    if (this._items == null) {
      this._items = new Array<PostDto>();
    }
    return this._items;
  }

  set items(value: Array<PostDto>) {
    this._items = value;
  }



}
