import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RessourceService } from '../../services/ressource.service';
import { Ressource } from '../../models/project.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ressource-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container animate-fade-in">
      <div class="header-section">
        <div>
          <h1 class="gradient-text">Gestion des Ressources</h1>
          <p class="subtitle">Visualisez et gérez les ressources matérielles et humaines du projet.</p>
        </div>
        <button *ngIf="isAdmin" class="btn-primary flex items-center gap-2" routerLink="/ressources/nouveau">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Nouvelle Ressource
        </button>
      </div>

      <div class="card glass-morphism">
        <div class="table-container">
          <table *ngIf="ressources.length > 0; else emptyState">
            <thead>
              <tr>
                <th>Nom de la Ressource</th>
                <th>Type</th>
                <th *ngIf="isAdmin" class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of ressources" class="hover-row">
                <td>
                  <div class="flex items-center gap-3">
                    <div class="icon-avatar">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                    <span class="font-semibold">{{ r.nom }}</span>
                  </div>
                </td>
                <td>
                  <span class="badge" [ngClass]="r.type.toLowerCase()">{{ r.type }}</span>
                </td>
                <td *ngIf="isAdmin" class="text-right">
                  <div class="flex justify-end gap-2">
                    <button class="btn-icon btn-edit" [routerLink]="['/ressources/edit', r.id]" title="Modifier">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button class="btn-icon btn-danger" (click)="deleteRessource(r.id!)" title="Supprimer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <ng-template #emptyState>
          <div class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="mb-4 opacity-20"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            <p>Aucune ressource répertoriée.</p>
            <button class="btn-outline mt-4" routerLink="/ressources/nouveau">Ajouter une ressource</button>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 2.5rem;
    }
    .gradient-text {
      background: linear-gradient(135deg, var(--primary) 0%, #a855f7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.25rem;
    }
    .subtitle {
      color: var(--text-muted);
      font-size: 0.95rem;
    }
    .glass-morphism {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .table-container {
      overflow-x: auto;
    }
    .hover-row {
      transition: background-color 0.2s;
    }
    .hover-row:hover {
      background-color: rgba(99, 102, 241, 0.03);
    }
    .icon-avatar {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: rgba(99, 102, 241, 0.1);
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }
    .badge.humaine { background: #dcfce7; color: #166534; }
    .badge.materielle { background: #fee2e2; color: #991b1b; }
    .badge.logicielle { background: #e0f2fe; color: #075985; }
    
    .btn-icon {
      padding: 0.5rem;
      border-radius: 0.5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      color: var(--text-muted);
    }
    .btn-edit:hover { background: #f1f5f9; color: var(--primary); }
    .btn-danger:hover { background: #fef2f2; color: #ef4444; }
    
    .empty-state {
      padding: 4rem 2rem;
      text-align: center;
      color: var(--text-muted);
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .flex { display: flex; }
    .items-center { align-items: center; }
    .justify-end { justify-content: flex-end; }
    .gap-2 { gap: 0.5rem; }
    .gap-3 { gap: 0.75rem; }
    .font-semibold { font-weight: 600; }
    .text-right { text-align: right; }
    .mt-4 { margin-top: 1rem; }
    .mb-4 { margin-bottom: 1rem; }
    .opacity-20 { opacity: 0.2; }
    .btn-outline {
      border: 1px solid var(--border);
      background: white;
      color: var(--text-main);
    }
    .btn-outline:hover {
      background: #f8fafc;
      border-color: var(--primary);
    }
  `]
})
export class RessourceListComponent implements OnInit {
  ressources: Ressource[] = [];
  isAdmin = false;

  constructor(
    private ressourceService: RessourceService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.loadRessources();
  }

  loadRessources() {
    this.ressourceService.getAll().subscribe({
      next: (data) => this.ressources = data,
      error: (err) => console.error('Error loading resources', err)
    });
  }

  deleteRessource(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette ressource ?')) {
      this.ressourceService.delete(id).subscribe({
        next: () => this.loadRessources(),
        error: (err) => alert('Erreur lors de la suppression')
      });
    }
  }
}
