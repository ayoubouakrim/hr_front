import {Routes} from '@angular/router';

import {LoginAdminComponent} from "./module/admin/login-admin/login-admin.component";
import {AppLayoutComponent} from "./layout/app-layout/app-layout.component";
import {EmployeListComponent} from "./module/admin/view/employe/employe/list/employe-list.component";
import {AdminDashboardComponent} from "./module/admin/view/admin-dashboard/admin-dashboard.component";
import {DepartementListComponent} from "./module/admin/view/departement/list/departement-list.component";


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
  ],
  },
]

