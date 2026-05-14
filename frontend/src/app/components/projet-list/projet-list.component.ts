import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjetService } from '../../services/projet.service';
import { Projet } from '../../models/project.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projet-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>Gestion des Projets</h1>
        <button class="btn-primary" routerLink="/projets/nouveau">+ Nouveau Projet</button>
      </div>

      <div class="card">
        <table *ngIf="projets.length > 0; else empty">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Début</th>
              <th>Fin</th>
              <th>Budget</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of projets">
              <td><strong>{{ p.nom }}</strong></td>
              <td>{{ p.dateDebut | date:'shortDate' }}</td>
              <td>{{ p.dateFin | date:'shortDate' }}</td>
              <td>{{ p.budget | currency:'EUR' }}</td>
              <td>
                <span [class]="'badge ' + p.statut">{{ p.statut }}</span>
              </td>
              <td>
                <div style="display: flex; gap: 0.5rem;">
                  <button class="btn-edit" [routerLink]="['/projets/edit', p.id]">Modifier</button>
                  <button class="btn-danger" (click)="deleteProjet(p.id!)">Supprimer</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <ng-template #empty>
          <p style="text-align: center; color: var(--text-muted);">Aucun projet trouvé.</p>
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
      text-transform: uppercase;
    }
    .TERMINEE { background-color: #dcfce7; color: #166534; }
    .EN_COURS { background-color: #dbeafe; color: #1e40af; }
    .A_FAIRE { background-color: #f1f5f9; color: #475569; }
    
    .btn-edit {
      background-color: #f1f5f9;
      color: #1e293b;
    }
    .btn-edit:hover {
      background-color: #e2e8f0;
    }
  `]
})
export class ProjetListComponent implements OnInit {
  projets: Projet[] = [];

  constructor(private projetService: ProjetService) {}

  ngOnInit() {
    this.loadProjets();
  }

  loadProjets() {
    this.projetService.getAll().subscribe(data => this.projets = data);
  }

  deleteProjet(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projetService.delete(id).subscribe(() => this.loadProjets());
    }
  }
}
