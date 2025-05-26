import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { AccountService } from '../../services/account.service';
import { Account } from '../../services/interfaces/account.interface';

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
  accounts: Account[] = [];
  minDate: string = '2025-05-22';
  maxDate: string = '';
  today = new Date(); 

  constructor(private reportService: ReportService, private accountService: AccountService) {
    this.maxDate = this.today.toISOString().split('T')[0]; // formato 'YYYY-MM-DD'
  }

  ngOnInit() {
    this.accountService.getAccounts()
      .subscribe((response: any) => {
        if (!response.data) {
          alert('No data received from the service');
          return;
        }
        this.accounts = response.data;
      });
  }

  generateReport() {
    if (!this.selectedAccount || !this.startDate || !this.endDate) {
      alert('Please fill in all fields');
      return;
    }
    
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
