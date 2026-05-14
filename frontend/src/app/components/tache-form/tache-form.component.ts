import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TacheService } from '../../services/tache.service';
import { ProjetService } from '../../services/projet.service';
import { EmployeService } from '../../services/employe.service';
import { Tache, Projet, Employe, EtatTache, PrioriteTache } from '../../models/project.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tache-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container">
      <div class="card" style="max-width: 600px; margin: 0 auto;">
        <h2>{{ isEdit ? 'Modifier la Tâche' : 'Nouvelle Tâche' }}</h2>
        <form (ngSubmit)="save()">
          <div class="form-group">
            <label>Titre</label>
            <input type="text" [(ngModel)]="tache.title" name="title" required>
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea [(ngModel)]="tache.description" name="description"></textarea>
          </div>
          <div class="form-group">
            <label>Projet</label>
            <select [(ngModel)]="tache.projetId" name="projetId" required>
              <option *ngFor="let p of projets" [value]="p.id">{{ p.nom }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Assigné à</label>
            <select [(ngModel)]="tache.employeId" name="employeId">
              <option *ngFor="let e of employes" [value]="e.id">{{ e.nom }}</option>
            </select>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label>Priorité</label>
              <select [(ngModel)]="tache.priorite" name="priorite">
                <option value="BASSE">Basse</option>
                <option value="MOYENNE">Moyenne</option>
                <option value="HAUTE">Haute</option>
              </select>
            </div>
            <div class="form-group">
              <label>État</label>
              <select [(ngModel)]="tache.etat" name="etat">
                <option value="A_FAIRE">A Faire</option>
                <option value="EN_COURS">En Cours</option>
                <option value="TERMINEE">Terminée</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Deadline</label>
            <input type="date" [(ngModel)]="tache.deadline" name="deadline">
          </div>
          <div style="display: flex; gap: 1rem; margin-top: 1rem;">
            <button type="submit" class="btn-primary" style="flex: 1;">Enregistrer</button>
            <button type="button" class="btn-secondary" routerLink="/taches" style="flex: 1;">Annuler</button>
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
export class TacheFormComponent implements OnInit {
  tache: any = { 
    title: '', 
    etat: 'A_FAIRE', 
    priorite: 'MOYENNE' 
  };
  isEdit = false;
  projets: Projet[] = [];
  employes: Employe[] = [];

  constructor(
    private tacheService: TacheService,
    private projetService: ProjetService,
    private employeService: EmployeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadDropdowns();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.tacheService.getAll().subscribe(data => {
        const found = data.find(t => t.id == id);
        if (found) {
          this.tache = {
            ...found,
            projetId: found.projet?.id,
            employeId: found.employe?.id
          };
        }
      });
    }
  }

  loadDropdowns() {
    this.projetService.getAll().subscribe(data => this.projets = data);
    this.employeService.getAll().subscribe(data => this.employes = data);
  }

  save() {
    if (this.isEdit) {
      this.tacheService.update(this.tache.id!, this.tache).subscribe(() => this.router.navigate(['/taches']));
    } else {
      this.tacheService.create(this.tache).subscribe(() => this.router.navigate(['/taches']));
    }
  }
}
