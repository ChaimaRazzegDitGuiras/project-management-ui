import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeService } from '../../services/employe.service';
import { Employe, Role } from '../../models/project.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employe-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container">
      <div class="card" style="max-width: 600px; margin: 0 auto;">
        <h2>{{ isEdit ? 'Modifier l\'Employé' : 'Nouvel Employé' }}</h2>
        <form (ngSubmit)="save()">
          <div class="form-group">
            <label>Nom</label>
            <input type="text" [(ngModel)]="employe.nom" name="nom" required>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" [(ngModel)]="employe.email" name="email" required>
          </div>
          <div class="form-group" *ngIf="!isEdit">
            <label>Mot de passe</label>
            <input type="password" [(ngModel)]="employe.password" name="password" required>
          </div>
          <div class="form-group">
            <label>Rôle</label>
            <select [(ngModel)]="employe.role" name="role" required>
              <option value="EMPLOYE">Employée</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div class="form-group">
            <label>Équipe</label>
            <input type="text" [(ngModel)]="employe.equipe" name="equipe">
          </div>
          <div style="display: flex; gap: 1rem; margin-top: 1rem;">
            <button type="submit" class="btn-primary" style="flex: 1;">Enregistrer</button>
            <button type="button" class="btn-secondary" routerLink="/employes" style="flex: 1;">Annuler</button>
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
export class EmployeFormComponent implements OnInit {
  employe: Employe = { nom: '', email: '', role: Role.EMPLOYE };
  isEdit = false;

  constructor(
    private employeService: EmployeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.employeService.getById(id).subscribe(data => this.employe = data);
    }
  }

  save() {
    if (this.isEdit) {
      this.employeService.update(this.employe.id!, this.employe).subscribe(() => this.router.navigate(['/employes']));
    } else {
      this.employeService.create(this.employe).subscribe(() => this.router.navigate(['/employes']));
    }
  }
}
