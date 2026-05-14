import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="login-container">
      <div class="card login-card">
        <h2>Connexion</h2>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Email</label>
            <input type="email" [(ngModel)]="credentials.email" name="email" required placeholder="admin@example.com">
          </div>
          <div class="form-group">
            <label>Mot de passe</label>
            <input type="password" [(ngModel)]="credentials.password" name="password" required placeholder="••••••••">
          </div>
          <button type="submit" class="btn-primary" [disabled]="loading">
            {{ loading ? 'Chargement...' : 'Se connecter' }}
          </button>
          <p *ngIf="error" class="error-msg">{{ error }}</p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 100px);
    }
    .login-card {
      width: 100%;
      max-width: 400px;
    }
    .error-msg {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }
  `]
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.auth.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/projets']),
      error: () => {
        this.error = 'Email ou mot de passe incorrect';
        this.loading = false;
      }
    });
  }
}
