import {Routes} from '@angular/router';

import {LoginAdminComponent} from "./components/admin/login-admin/login-admin.component";
import {AppLayoutComponent} from "./layout/app-layout/app-layout.component";
import {EmployeListComponent} from "./components/admin/view/employe/employe/list/employe-list.component";
import {AdminDashboardComponent} from "./components/admin/view/admin-dashboard/admin-dashboard.component";
import {DepartementListComponent} from "./components/admin/view/departement/list/departement-list.component";
import {AbsenceListComponent} from "./components/admin/view/conge/absence/list/absence-list.component";
import {CongeListComponent} from "./components/admin/view/conge/conge/list/conge-list.component";
import {HoraireListComponent} from "./components/admin/view/presence/horaire/list/horaire-list.component";
import {PresenceListComponent} from "./components/admin/view/presence/presence/list/presence-list.component";
import {ReunionListComponent} from "./components/admin/view/reunion/list/reunion-list.component";


export const routes: Routes = [
  {path: '', component: LoginAdminComponent},
  {path: 'admin/login', component: LoginAdminComponent},
  {path: 'app', component: AppLayoutComponent,
    children: [
      {
        path: 'employe', component: EmployeListComponent,
      },
      {
        path: 'dashboard', component: AdminDashboardComponent,
      },
      {
        path: 'departement', component: DepartementListComponent,
      },
      {
        path: 'absence', component: AbsenceListComponent,
      },
      {
        path: 'conge', component: CongeListComponent,
      },
      {
        path: 'horaire', component: HoraireListComponent,
      },
      {
        path: 'presence', component: PresenceListComponent,
      },
      {
        path: 'reunion', component: ReunionListComponent,
      },
  ],
  },
]

