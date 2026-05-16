import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <a routerLink="/" class="logo">ProjectManager</a>
        <div class="nav-links" *ngIf="auth.isLoggedIn()">
          <a routerLink="/projets" routerLinkActive="active">Projets</a>
          <a routerLink="/employes" routerLinkActive="active">Employés</a>
          <a routerLink="/taches" routerLinkActive="active">Tâches</a>
          <a routerLink="/ressources" routerLinkActive="active">Ressources</a>
          <button (click)="auth.logout()" class="btn-logout">Déconnexion</button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      padding: 1rem 0;
    }
    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2rem;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: #6366f1;
      text-decoration: none;
    }
    .nav-links {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }
    .nav-links a {
      text-decoration: none;
      color: #64748b;
      font-weight: 500;
      transition: color 0.2s;
    }
    .nav-links a.active, .nav-links a:hover {
      color: #6366f1;
    }
    .btn-logout {
      background: none;
      border: 1px solid #e2e8f0;
      color: #ef4444;
      padding: 0.4rem 0.8rem;
    }
    .btn-logout:hover {
      background-color: #fef2f2;
    }
  `]
})
export class NavbarComponent {
  constructor(public auth: AuthService) {}
}
