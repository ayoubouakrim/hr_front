import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private router : Router) { }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('matricule');
    localStorage.removeItem('datee');
    localStorage.removeItem('username');
    window.location.reload();
  }

  showProfil(){
   this.router.navigate(['/app-user/profile']);
  }
}
