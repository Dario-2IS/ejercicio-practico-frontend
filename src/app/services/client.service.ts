import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
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
        return throwError(() => error);
      })
    );
  }

  getClientById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/clients/${id}`)
    .pipe(
      map(response => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  addClient(client: Client): Observable<any> {
    return this.http.post(`${this.apiUrl}/clients`, client)
    .pipe(
      map(response => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  updateClient(client: Client): Observable<any> {
    return this.http.put(`${this.apiUrl}/clients`, client)
    .pipe(
      map(response => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  deleteClient(identificationNumber: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clients/${identificationNumber}`)
    .pipe(
      map(response => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

}
