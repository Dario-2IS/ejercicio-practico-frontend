import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  selectedAccount: string = '';
  startDate: string = '';
  endDate: string = '';

  accounts: string[] = [
    'Cuenta Corriente 001',
    'Cuenta Ahorro 002',
    'Cuenta Empresarial 003'
  ];

  generateReport() {
    console.log('Cuenta:', this.selectedAccount);
    console.log('Fecha Inicio:', this.startDate);
    console.log('Fecha Fin:', this.endDate);
    alert(`Generando reporte para ${this.selectedAccount}`);
  }

}
