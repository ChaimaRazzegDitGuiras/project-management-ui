import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeService } from '../../services/employe.service';
import { Employe } from '../../models/project.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employe-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>Gestion des Employés</h1>
        <button class="btn-primary" routerLink="/employes/nouveau">+ Nouvel Employé</button>
      </div>

      <div class="card">
        <table *ngIf="employes.length > 0; else empty">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Équipe</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let e of employes">
              <td><strong>{{ e.nom }}</strong></td>
              <td>{{ e.email }}</td>
              <td>{{ e.role }}</td>
              <td>{{ e.equipe }}</td>
              <td>
                <div style="display: flex; gap: 0.5rem;">
                  <button class="btn-edit" [routerLink]="['/employes/edit', e.id]">Modifier</button>
                  <button class="btn-danger" (click)="deleteEmploye(e.id!)">Supprimer</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <ng-template #empty>
          <p style="text-align: center; color: var(--text-muted);">Aucun employé trouvé.</p>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .btn-edit {
      background-color: #f1f5f9;
      color: #1e293b;
    }
    .btn-edit:hover {
      background-color: #e2e8f0;
    }
  `]
})
export class EmployeListComponent implements OnInit {
  employes: Employe[] = [];

  constructor(private employeService: EmployeService) {}

  ngOnInit() {
    this.loadEmployes();
  }

  loadEmployes() {
    this.employeService.getAll().subscribe(data => this.employes = data);
  }

  deleteEmploye(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      this.employeService.delete(id).subscribe(() => this.loadEmployes());
    }
  }
}
