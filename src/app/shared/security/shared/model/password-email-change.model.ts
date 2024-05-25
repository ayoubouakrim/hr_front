
export class PasswordEmailChange {
  public id : number | null;
  public username : string;
  public email : string;
  public password : string;

  constructor() {
    this.id = null;
    this.username = '';
    this.email = '';
    this.password = '';
  }
}
