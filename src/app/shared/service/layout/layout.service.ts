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
    window.location.reload();
  }

  showProfil(){
   this.router.navigate(['/app-user/user-profile']);
  }
}
