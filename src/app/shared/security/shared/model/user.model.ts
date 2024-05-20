import {Role} from "./role.model";

export class User{
  public id : number | null;
  public username : string;
  public email : string;
  public password : string;
  public roles : Array<Role>;
  constructor() {
    this.id = null;
    this.username = '';
    this.email = '';
    this.password = '';
    this.roles = new Array<Role>();
  }
}
