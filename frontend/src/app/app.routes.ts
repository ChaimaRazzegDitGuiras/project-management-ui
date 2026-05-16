import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProjetListComponent } from './components/projet-list/projet-list.component';
import { ProjetFormComponent } from './components/projet-form/projet-form.component';
import { EmployeListComponent } from './components/employe-list/employe-list.component';
import { EmployeFormComponent } from './components/employe-form/employe-form.component';
import { TacheListComponent } from './components/tache-list/tache-list.component';
import { TacheFormComponent } from './components/tache-form/tache-form.component';
import { RessourceListComponent } from './components/ressource-list/ressource-list.component';
import { RessourceFormComponent } from './components/ressource-form/ressource-form.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'projets', 
    component: ProjetListComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'projets/nouveau', 
    component: ProjetFormComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'projets/edit/:id', 
    component: ProjetFormComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'employes', 
    component: EmployeListComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'employes/nouveau', 
    component: EmployeFormComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'employes/edit/:id', 
    component: EmployeFormComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'taches', 
    component: TacheListComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'taches/nouveau', 
    component: TacheFormComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'taches/edit/:id', 
    component: TacheFormComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'ressources', 
    component: RessourceListComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'ressources/nouveau', 
    component: RessourceFormComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'ressources/edit/:id', 
    component: RessourceFormComponent,
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'projets', pathMatch: 'full' }
];
