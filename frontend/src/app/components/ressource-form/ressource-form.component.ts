import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RessourceService } from '../../services/ressource.service';
import { Ressource } from '../../models/project.model';

@Component({
  selector: 'app-ressource-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container animate-fade-in">
      <div class="breadcrumb">
        <a routerLink="/ressources">Ressources</a>
        <span>/</span>
        <span class="active">{{ isEdit ? 'Modifier' : 'Ajouter' }}</span>
      </div>

      <div class="form-card glass-morphism">
        <div class="form-header">
          <h2>{{ isEdit ? 'Modifier la Ressource' : 'Nouvelle Ressource' }}</h2>
          <p>Remplissez les informations ci-dessous pour {{ isEdit ? 'mettre à jour' : 'créer' }} la ressource.</p>
        </div>

        <form (ngSubmit)="saveRessource()" #resourceForm="ngForm">
          <div class="form-grid">
            <div class="form-group">
              <label for="nom">Nom de la ressource</label>
              <div class="input-wrapper">
                <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <input type="text" id="nom" name="nom" [(ngModel)]="ressource.nom" required placeholder="Ex: Serveur Cloud, Développeur Senior..." #nom="ngModel">
              </div>
              <div *ngIf="nom.invalid && nom.touched" class="error-text">Le nom est obligatoire.</div>
            </div>

            <div class="form-group">
              <label for="type">Type de ressource</label>
              <div class="input-wrapper">
                <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                <select id="type" name="type" [(ngModel)]="ressource.type" required>
                  <option value="" disabled selected>Sélectionnez un type</option>
                  <option value="HUMAINE">Humaine</option>
                  <option value="MATERIELLE">Matérielle</option>
                  <option value="LOGICIELLE">Logicielle</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-cancel" routerLink="/ressources">Annuler</button>
            <button type="submit" class="btn-primary" [disabled]="resourceForm.invalid">
              {{ isEdit ? 'Enregistrer les modifications' : 'Créer la ressource' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .breadcrumb {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
      color: var(--text-muted);
    }
    .breadcrumb a {
      color: var(--primary);
      text-decoration: none;
    }
    .breadcrumb a:hover { text-decoration: underline; }
    .breadcrumb .active { color: var(--text-main); font-weight: 500; }

    .form-card {
      max-width: 800px;
      margin: 0 auto;
      padding: 2.5rem;
      border-radius: 1rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
    .glass-morphism {
      background: white;
      border: 1px solid var(--border);
    }
    .form-header {
      margin-bottom: 2rem;
      text-align: center;
    }
    .form-header h2 {
      font-size: 1.875rem;
      margin-bottom: 0.5rem;
      color: var(--text-main);
    }
    .form-header p {
      color: var(--text-muted);
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    @media (min-width: 640px) {
      .form-grid { grid-template-columns: 1fr 1fr; }
    }

    .form-group label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--text-main);
    }
    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    .input-icon {
      position: absolute;
      left: 0.75rem;
      color: var(--text-muted);
      pointer-events: none;
    }
    input, select {
      width: 100%;
      padding: 0.75rem 0.75rem 0.75rem 2.5rem;
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      transition: all 0.2s;
      background: #f9fafb;
    }
    input:focus, select:focus {
      background: white;
      border-color: var(--primary);
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
      outline: none;
    }
    .error-text {
      color: #ef4444;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      border-top: 1px solid var(--border);
      padding-top: 1.5rem;
    }
    .btn-cancel {
      background: white;
      border: 1px solid var(--border);
      color: var(--text-main);
    }
    .btn-cancel:hover { background: #f3f4f6; }
    
    .animate-fade-in {
      animation: fadeIn 0.4s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }
  `]
})
export class RessourceFormComponent implements OnInit {
  ressource: Ressource = { nom: '', type: '' };
  isEdit = false;

  constructor(
    private ressourceService: RessourceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.ressourceService.getById(id).subscribe({
        next: (data) => this.ressource = data,
        error: (err) => console.error('Error fetching resource', err)
      });
    }
  }

  saveRessource() {
    const obs = this.isEdit 
      ? this.ressourceService.update(this.ressource.id!, this.ressource)
      : this.ressourceService.create(this.ressource);

    obs.subscribe({
      next: () => {
        alert(this.isEdit ? 'Ressource mise à jour !' : 'Ressource créée !');
        this.router.navigate(['/ressources']);
      },
      error: (err) => alert('Une erreur est survenue lors de l\'enregistrement.')
    });
  }
}
