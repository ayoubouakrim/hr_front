import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private url = 'http://localhost:8089/api/v1/user/demande';

  constructor(private http: HttpClient) {
  }

  public countByEmployeMatriculeAndEtatDemandeLibelle(libelle : string){
    const matricule = localStorage.getItem('matricule') as string;
    return this.http.get<number>(this.url + '/totalDemande/matricule/' + matricule + '/libelle/' + libelle);
  }
}
