import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getAccounts(): Observable<any> { 
    return this.http.get(`${this.apiUrl}/accounts`)
    .pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching accounts:', error);
        return of(null);
      })
    );
  }

  getAccountById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/${id}`)
    .pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching account:', error);
        return of(null);
      })
    );
  }

  addAccount(account: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/accounts`, account)
    .pipe(
      map(response => response),
      catchError(error => {
        console.error('Error adding account:', error);
        return of(null);
      })
    );
  }

  updateAccount(id: number, account: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/accounts/${id}`, account)
    .pipe(
      map(response => response),
      catchError(error => {
        console.error('Error updating account:', error);
        return of(null);
      })
    );
  }
  
  deleteAccount(identificationNumber: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/accounts/${identificationNumber}`)
    .pipe(
      map(response => response),
      catchError(error => {
        console.error('Error deleting account:', error);
        return of(null);
      })
    );
  }

}
