import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Client } from './interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http:HttpClient) { }

  getClients(): Observable<any> { 
    return this.http.get(`${this.apiUrl}/clients`)
    .pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching clients:', error);
        return of(null);
      })
    );
  }

  getClientById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/clients/${id}`)
    .pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching client:', error);
        return of(null);
      })
    );
  }

  addClient(client: Client): Observable<any> {
    return this.http.post(`${this.apiUrl}/clients`, client)
    .pipe(
      map(response => response),
      catchError(error => {
        console.error('Error adding client:', error);
        return of(null);
      })
    );
  }

  updateClient(client: Client): Observable<any> {
    return this.http.put(`${this.apiUrl}/clients`, client)
    .pipe(
      map(response => response),
      catchError(error => {
        console.error('Error updating client:', error);
        return of(null);
      })
    );
  }

  deleteClient(identificationNumber: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clients/${identificationNumber}`)
    .pipe(
      map(response => response),
      catchError(error => {
        console.error('Error deleting client:', error);
        return of(null);
      })
    );
  }

}
