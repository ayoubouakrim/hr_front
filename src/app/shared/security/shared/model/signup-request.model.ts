export class SignupRequest {
  public username: string;
  public email: string;
  public role: string;
  public password: string;
  constructor() {
    this.username='';
    this.email='';
    this.role='';
    this.password='';
  }
}
