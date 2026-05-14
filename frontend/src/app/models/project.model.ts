export interface Employe {
  id?: number;
  nom: string;
  email: string;
  password?: string;
  role: Role;
  equipe?: string;
}

export enum Role {
  ADMIN = 'ADMIN',
  EMPLOYE = 'EMPLOYE'
}

export interface Projet {
  id?: number;
  nom: string;
  dateDebut?: string;
  dateFin?: string;
  budget?: number;
  statut?: string;
}

export interface Tache {
  id?: number;
  title: string;
  description?: string;
  etat: EtatTache;
  priorite: PrioriteTache;
  deadline?: string;
  projetId?: number;
  employeId?: number;
  projet?: Projet;
  employe?: Employe;
}

export enum EtatTache {
  A_FAIRE = 'A_FAIRE',
  EN_COURS = 'EN_COURS',
  TERMINEE = 'TERMINEE',
  BLOQUEE = 'BLOQUEE',
  EN_ATTENTE = 'EN_ATTENTE'
}

export enum PrioriteTache {
  BASSE = 'BASSE',
  MOYENNE = 'MOYENNE',
  HAUTE = 'HAUTE',
  CRITIQUE = 'CRITIQUE',
  URGENTE = 'URGENTE'
}
