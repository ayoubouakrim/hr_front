import {Routes} from '@angular/router';



import {LoginComponent} from "./components/login/login.component";
import {PasswordResetRequestComponent} from "./components/security/password-reset-request/password-reset-request.component";
import {PasswordChangeComponent} from "./components/security/password-change/password-change.component";
import {RegisterUserComponent} from "./components/security/register-user/register-user.component";
import {authGuard} from "./shared/security/guards/auth.guard";
import {AppLayoutComponent} from "./layout/app-layout/app-layout.component";
import {EmployeListComponent} from "./components/admin/view/employe/employe/list/employe-list.component";
import {AdminDashboardComponent} from "./components/admin/view/admin-dashboard/admin-dashboard.component";
import {DepartementListComponent} from "./components/admin/view/departement/list/departement-list.component";
import {AbsenceListComponent} from "./components/admin/view/conge/absence/list/absence-list.component";
import {CongeListComponent} from "./components/admin/view/conge/conge/list/conge-list.component";
import {HoraireListComponent} from "./components/admin/view/presence/horaire/list/horaire-list.component";
import {PresenceListComponent} from "./components/admin/view/presence/presence/list/presence-list.component";
import {ReunionListComponent} from "./components/admin/view/reunion/list/reunion-list.component";
import {CommissionListComponent} from "./components/admin/view/employe/commission/list/commission-list.component";
import {NotificationListComponent} from "./components/admin/view/notification/list/notification-list.component";
import {SuiviMensuelListComponent} from "./components/admin/view/suiviMensuel/list/suivi-mensuel-list.component";
import {ProfileComponent} from "./components/admin/profile/profile.component";



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
        path: 'profile', component: ProfileComponent,
      },
      {
        path: 'commission', component: CommissionListComponent,
      },
      {
        path: 'notification', component: NotificationListComponent,
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
      {
        path: 'rapport', component: SuiviMensuelListComponent,
      },
  ],
  },
]

