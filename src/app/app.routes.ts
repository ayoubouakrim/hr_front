import {Routes} from '@angular/router';

import {AppLayoutComponent} from "./layout/app-layout/app-layout.component";
import {LoginComponent} from "./components/login/login.component";
import {PasswordResetRequestComponent} from "./components/security/password-reset-request/password-reset-request.component";
import {PasswordChangeComponent} from "./components/security/password-change/password-change.component";
import {EmployeListComponent} from "./components/user/view/employe/employe/list/employe-list.component";
import {DepartementListComponent} from "./components/user/view/departement/list/departement-list.component";
import {RegisterUserComponent} from "./components/security/register-user/register-user.component";
import {AdminDashboardComponent} from "./components/admin/view/admin-dashboard/admin-dashboard.component";
import {authGuard} from "./shared/security/guards/auth.guard";


export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'reset-request', component: PasswordResetRequestComponent},
  {path: 'password-change', component: PasswordChangeComponent},
  {path:'admin/register',component:RegisterUserComponent},
  {path: 'app', component: AppLayoutComponent,
    children: [
      {
        path: 'employe', component: EmployeListComponent,
      },
      {
        path: 'dashboard', component: AdminDashboardComponent,canActivate: [authGuard],
        data: {
          roles: ['ADMIN'],
      }
      },
      {
        path: 'departement', component: DepartementListComponent,
      },
  ],
  },
]

