import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tache } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private apiUrl = 'http://localhost:8081/api/taches';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.apiUrl);
  }

  getMyTasks(): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.apiUrl}/my`);
  }

  create(tache: Tache): Observable<Tache> {
    return this.http.post<Tache>(this.apiUrl, tache);
  }

  update(id: number, tache: Tache): Observable<Tache> {
    return this.http.put<Tache>(`${this.apiUrl}/${id}`, tache);
  }

  updateMyTask(id: number, tache: Tache): Observable<Tache> {
    return this.http.put<Tache>(`${this.apiUrl}/my/${id}`, tache);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
