import {Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {
  PasswordResetRequestComponent
} from "./components/security/password-reset-request/password-reset-request.component";
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
import {UserDashboardComponent} from "./components/user/view/user-dashboard/user-dashboard.component";
import {AppLayoutUserComponent} from "./layout/user/app-layout-user/app-layout-user..component";
import {UserProfileComponent} from "./components/user/view/user-profile/user-profile.component";
import {
  DemandeAbsenceListComponent
} from "./components/user/view/demande/demande-absence/demande-absence-list/demande-absence-list.component";
import {
  DemandeCongeListComponent
} from "./components/user/view/demande/demande-conge/demande-conge-list/demande-conge-list.component";
import {
  DemandeDocumentListComponent
} from "./components/user/view/demande/demande-document/demande-document-list/demande-document-list.component";
import {
  DemandeAbsenceListAdminComponent
} from "./components/admin/view/demande/demande-absence/demande-absence-list/demande-absence-list.component";
import {
  DemandeCongeListAdminComponent
} from "./components/admin/view/demande/demande-conge/demande-conge-list/demande-conge-list.component";
import {
  DemandeDocumentListAdminComponent
} from "./components/admin/view/demande/demande-document/demande-document-list/demande-document-list.component";

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'reset-request', component: PasswordResetRequestComponent},
  {path: 'admin/register', component: RegisterUserComponent},
  {
    path: 'app', component: AppLayoutComponent,
    children: [
      {
        path: 'employe', component: EmployeListComponent
      },
      {
        path: 'dashboard', component: AdminDashboardComponent
      },
      {
        path: 'departement', component: DepartementListComponent
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
      {path: 'demande-absence', component: DemandeAbsenceListAdminComponent,},
      {path: 'demande-conge', component: DemandeCongeListAdminComponent},
      {path: 'demande-document', component: DemandeDocumentListAdminComponent}
    ],
  },
  {
    path: 'app-user', component: AppLayoutUserComponent,
    children: [
      {
        path: 'user-profile', component: UserProfileComponent
      },
      {
        path: 'dashboard-user', component: UserDashboardComponent
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
      {path: 'demande-absence', component: DemandeAbsenceListComponent},
      {path: 'demande-conge', component: DemandeCongeListComponent},
      {path: 'demande-document', component: DemandeDocumentListComponent}
    ],
  },
]
/*
export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'reset-request', component: PasswordResetRequestComponent},
  {path: 'password-change', component: PasswordChangeComponent},
  {path: 'admin/register', component: RegisterUserComponent},
  {
    path: 'app', component: AppLayoutComponent,
    children: [
      {
        path: 'employe', component: EmployeListComponent, canActivate: [authGuard],
        data: {
          roles: 'USER',
        }
      },
      {
        path: 'dashboard', component: AdminDashboardComponent, canActivate: [authGuard],
        data: {
          roles: 'ADMIN',
        }
      },
      {
        path: 'dashboard-user', component: UserDashboardComponent},
      {
        path: 'departement', component: DepartementListComponent, canActivate: [authGuard],
        data: {
          roles: 'USER',
        }
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
  {
    path: 'app-user', component: AppLayoutUserComponent,
    children: [{path: 'employe', component: EmployeListComponent, canActivate: [authGuard],
      data: {
        roles: 'USER',
      }
    },
      {
        path: 'dashboard', component: AdminDashboardComponent, canActivate: [authGuard],
        data: {
          roles: 'ADMIN',
        }
      },
      {
        path: 'dashboard-user', component: UserDashboardComponent},
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
 */
