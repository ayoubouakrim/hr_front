import {Routes} from '@angular/router';
import {
  PasswordResetRequestComponent
} from "./components/security/password-reset-request/password-reset-request.component";
import {authGuard} from "./shared/security/guards/auth.guard";
import {EmployeListComponent} from "./components/admin/view/employe/employe/list/employe-list.component";
import {AdminDashboardComponent} from "./components/admin/view/admin-dashboard/admin-dashboard.component";
import {DepartementListComponent} from "./components/admin/view/departement/list/departement-list.component";
import {AbsenceListComponent} from "./components/admin/view/conge/absence/list/absence-list.component";
import {CongeListComponent} from "./components/admin/view/conge/conge/list/conge-list.component";
import {HoraireListComponent} from "./components/admin/view/presence/horaire/list/horaire-list.component";
import {PresenceListComponent} from "./components/admin/view/presence/presence/list/presence-list.component";
import {ReunionListComponent} from "./components/admin/view/reunion/list/reunion-list.component";
import {UserDashboardComponent} from "./components/user/view/user-dashboard/user-dashboard.component";
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

import {CommissionListComponent} from "./components/admin/view/employe/commission/list/commission-list.component";
import {NotificationListComponent} from "./components/admin/view/notification/list/notification-list.component";
import {SuiviMensuelListComponent} from "./components/admin/view/suiviMensuel/list/suivi-mensuel-list.component";
import {ProfileComponent} from "./components/admin/profile/profile.component";
import {AppLayoutComponent} from "./layout/app-layout/app-layout.component";
import {UserLayoutComponent} from "./layout/user/user-layout/user-layout.component";
import {LoginComponent} from "./components/login/login.component";
import {UserListComponent} from "./components/admin/view/account/user-list/user-list.component";
import {UserViewComponent} from "./components/user/view/user/user-view/user-view.component";
import {ListComponent} from "./components/user/view/reunion/list/list.component";
import {PresenceListUserComponent} from "./components/user/view/presence/list/presence-list-user.component";
import {AbsenceListUserComponent} from "./components/user/view/conge/absence/list/absence-list-user.component";
import {CongeListUserComponent} from "./components/user/view/conge/conge/list/conge-list-user.component";
import {ReinitiaPasswordComponent} from "./components/security/reinitia-password/reinitia-password.component";
import {CommissionListUserComponent} from "./components/user/view/commission/list/commission-list-user.component";

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'reset-request', component: PasswordResetRequestComponent},
  {path: 'edit-password', component: ReinitiaPasswordComponent},
  {
    path: 'app', component: AppLayoutComponent,
    children: [
      {
        path: 'employe', component: EmployeListComponent, canActivate: [authGuard],
        data: {
          roles: 'ADMIN',
        }
      },
      {
        path: 'accounts', component: UserListComponent, canActivate: [authGuard],
        data: {
          roles: 'ADMIN',
        }
      },
      {
        path: 'profile', component: ProfileComponent, canActivate: [authGuard],
        data: {
          roles: 'ADMIN',
        }
      },
      {
        path: 'commission', component: CommissionListComponent, canActivate: [authGuard],
        data: {
          roles: 'ADMIN',
        }
      },
      {
        path: 'notification', component: NotificationListComponent, canActivate: [authGuard],
        data: {
          roles: 'ADMIN',
        }
      },
      {
        path: 'dashboard', component: AdminDashboardComponent, canActivate: [authGuard],
        data: {
          roles: 'ADMIN',
        }
      },
      {
        path: 'departement', component: DepartementListComponent, canActivate: [authGuard],
        data: {
          roles: 'ADMIN',
        }
      },
      {
        path: 'absence', component: AbsenceListComponent, canActivate: [authGuard],
        data: {
          roles: 'ADMIN',
        }
      },
      {
        path: 'conge', component: CongeListComponent, canActivate: [authGuard],
        data: {
          roles: 'ADMIN',
        }
      },
      {
        path: 'horaire', component: HoraireListComponent, canActivate: [authGuard],
        data: {
          roles: 'ADMIN',
        }
      },
      {
        path: 'presence', component: PresenceListComponent, canActivate: [authGuard],
        data: {
          roles: 'ADMIN',
        }
      },
      {
        path: 'reunion', component: ReunionListComponent, canActivate: [authGuard],
        data: {
          roles: 'ADMIN',
        }
      },

      {
        path: 'demande-absence', component: DemandeAbsenceListAdminComponent, canActivate: [authGuard],
        data: {
          roles: 'ADMIN',
        }
      },
      {
        path: 'demande-conge', component: DemandeCongeListAdminComponent, canActivate: [authGuard],
        data: {
          roles: 'ADMIN',
        }
      },
      {
        path: 'demande-document', component: DemandeDocumentListAdminComponent, canActivate: [authGuard],
        data: {
          roles: 'ADMIN',
        }
      },
      {
        path: 'rapport', component: SuiviMensuelListComponent, canActivate: [authGuard],
        data: {
          roles: 'ADMIN',
        }
      },
    ],
  },
  {
    path: 'app-user', component: UserLayoutComponent,
    children: [
      {
        path: 'profile', component: UserProfileComponent, canActivate: [authGuard],
        data: {
          roles: 'USER',
        }
      },
      {
        path: 'user', component: UserViewComponent, canActivate: [authGuard],
        data: {
          roles: 'USER',
        }
      },
      {
        path: 'dashboard-user', component: UserDashboardComponent, canActivate: [authGuard],
        data: {
          roles: 'USER',
        }
      },
      {
        path: 'horaire', component: HoraireListComponent, canActivate: [authGuard],
        data: {
          roles: 'USER',
        }
      },
      {
        path: 'commission', component: CommissionListUserComponent, canActivate: [authGuard],
        data: {
          roles: 'USER',
        }
      },
      {
        path: 'absence', component: AbsenceListUserComponent, canActivate: [authGuard],
        data: {
          roles: 'USER',
        }
      },
      {
        path: 'conge', component: CongeListUserComponent, canActivate: [authGuard],
        data: {
          roles: 'USER',
        }
      },
      {
        path: 'presence', component: PresenceListUserComponent, canActivate: [authGuard],
        data: {
          roles: 'USER',
        }
      },
      {
        path: 'reunion', component: ListComponent, canActivate: [authGuard],
        data: {
          roles: 'USER',
        }
      },
      {
        path: 'demande-absence', component: DemandeAbsenceListComponent, canActivate: [authGuard],
        data: {
          roles: 'USER',
        }
      },
      {
        path: 'demande-conge', component: DemandeCongeListComponent, canActivate: [authGuard],
        data: {
          roles: 'USER',
        }
      },
      {
        path: 'demande-document', component: DemandeDocumentListComponent, canActivate: [authGuard],
        data: {
          roles: 'USER',
        }
      }
    ],
  }
]
