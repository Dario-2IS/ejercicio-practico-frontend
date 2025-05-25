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

  constructor(private reportService: ReportService, private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.getAccounts()
        .subscribe((data: Account[]) => {
          if (!data) {
            console.error('No data received from the service');
            return;
          }
          if (!Array.isArray(data)) {
            console.error('Expected an array of accounts, but received:', data);
            return;
          }
          console.log('Accounts fetched:', data);
          if (data.length === 0) {
            console.warn('No accounts found');
            return;
          }
          data.forEach(account => {  
            if (!account.accountNumber || !account.accountType || !account.client.identificationNumber) {
              console.error('Account data is missing required properties:', account);
              return;
            }
          });
    
          this.accounts = data;
        });
  }

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
