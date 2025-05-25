import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../services/report.service';

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
    'ACC5678299'
  ];

  constructor(private reportService: ReportService) {}

  generateReport() {
    if (!this.selectedAccount || !this.startDate || !this.endDate) {
      alert('Please fill in all fields');
      console.error('Please fill in all fields');
      return;
    }

    console.log('Generating report for account:', this.selectedAccount);
    console.log('Start date:', this.startDate);
    console.log('End date:', this.endDate);
    this.reportService.getReport(this.selectedAccount, this.startDate, this.endDate)
      .subscribe(response => {
    const blob = new Blob([response.body!], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  });
  }

}
