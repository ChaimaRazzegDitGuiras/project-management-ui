import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TacheService } from '../../services/tache.service';
import { Tache } from '../../models/project.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tache-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>Gestion des Tâches</h1>
        <button class="btn-primary" routerLink="/taches/nouveau">+ Nouvelle Tâche</button>
      </div>

      <div class="card">
        <table *ngIf="taches.length > 0; else empty">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Projet</th>
              <th>Assigné à</th>
              <th>Priorité</th>
              <th>État</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let t of taches">
              <td><strong>{{ t.title }}</strong></td>
              <td>{{ t.projet?.nom }}</td>
              <td>{{ t.employe?.nom }}</td>
              <td>
                <span [class]="'badge-prio ' + t.priorite">{{ t.priorite }}</span>
              </td>
              <td>
                <span [class]="'badge ' + t.etat">{{ t.etat }}</span>
              </td>
              <td>{{ t.deadline | date:'shortDate' }}</td>
              <td>
                <div style="display: flex; gap: 0.5rem;">
                  <button class="btn-edit" [routerLink]="['/taches/edit', t.id]">Modifier</button>
                  <button class="btn-danger" (click)="deleteTache(t.id!)">Supprimer</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <ng-template #empty>
          <p style="text-align: center; color: var(--text-muted);">Aucune tâche trouvée.</p>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .badge {
      padding: 0.25rem 0.625rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .TERMINEE { background-color: #dcfce7; color: #166534; }
    .EN_COURS { background-color: #dbeafe; color: #1e40af; }
    .A_FAIRE { background-color: #f1f5f9; color: #475569; }

    .badge-prio {
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.7rem;
      font-weight: 700;
      color: white;
    }
    .HAUTE { background-color: #ef4444; }
    .MOYENNE { background-color: #f59e0b; }
    .BASSE { background-color: #10b981; }
    
    .btn-edit {
      background-color: #f1f5f9;
      color: #1e293b;
    }
    .btn-edit:hover {
      background-color: #e2e8f0;
    }
  `]
})
export class TacheListComponent implements OnInit {
  taches: Tache[] = [];

  constructor(private tacheService: TacheService) {}

  ngOnInit() {
    this.loadTaches();
  }

  loadTaches() {
    this.tacheService.getAll().subscribe(data => this.taches = data);
  }

  deleteTache(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      this.tacheService.delete(id).subscribe(() => this.loadTaches());
    }
  }
}
