import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getReport(accountNumber: string, startDate: string, endDate: string): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get(`${this.apiUrl}/reports/transactions/${accountNumber}`,{
      params,
      responseType: 'blob', // 👈 importante para binarios
      observe: 'response'   // 👈 para acceder a headers si es necesario
    });
  }
}
