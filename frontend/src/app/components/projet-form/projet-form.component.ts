import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjetService } from '../../services/projet.service';
import { Projet } from '../../models/project.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-projet-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container">
      <div class="card" style="max-width: 600px; margin: 0 auto;">
        <h2>{{ isEdit ? 'Modifier le Projet' : 'Nouveau Projet' }}</h2>
        <form (ngSubmit)="save()">
          <div class="form-group">
            <label>Nom du projet</label>
            <input type="text" [(ngModel)]="projet.nom" name="nom" required>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label>Date de début</label>
              <input type="date" [(ngModel)]="projet.dateDebut" name="dateDebut">
            </div>
            <div class="form-group">
              <label>Date de fin</label>
              <input type="date" [(ngModel)]="projet.dateFin" name="dateFin">
            </div>
          </div>
          <div class="form-group">
            <label>Budget (€)</label>
            <input type="number" [(ngModel)]="projet.budget" name="budget">
          </div>
          <div class="form-group">
            <label>Statut</label>
            <select [(ngModel)]="projet.statut" name="statut">
              <option value="A_FAIRE">A Faire</option>
              <option value="EN_COURS">En Cours</option>
              <option value="TERMINEE">Terminée</option>
            </select>
          </div>
          <div style="display: flex; gap: 1rem; margin-top: 1rem;">
            <button type="submit" class="btn-primary" style="flex: 1;">Enregistrer</button>
            <button type="button" class="btn-secondary" routerLink="/projets" style="flex: 1;">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .btn-secondary {
      background-color: #f1f5f9;
      color: #1e293b;
    }
  `]
})
export class ProjetFormComponent implements OnInit {
  projet: Projet = { nom: '', statut: 'A_FAIRE' };
  isEdit = false;

  constructor(
    private projetService: ProjetService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.projetService.getById(id).subscribe(data => this.projet = data);
    }
  }

  save() {
    if (this.isEdit) {
      this.projetService.update(this.projet.id!, this.projet).subscribe(() => this.router.navigate(['/projets']));
    } else {
      this.projetService.create(this.projet).subscribe(() => this.router.navigate(['/projets']));
    }
  }
}
