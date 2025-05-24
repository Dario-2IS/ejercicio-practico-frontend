import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../../services/interfaces/account.interface';

@Component({
  selector: 'app-account',
  imports: [CommonModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  searchTerm: string = '';
  
    accounts: Account[] = [
      { accountNumber: '1234567890', accountType: 'Savings', balance: 1000, currency: 'USD', state: true, clientId: '1' },
      { accountNumber: '0987654321', accountType: 'Checking', balance: 2000, currency: 'USD', state: true, clientId: '2' },
      { accountNumber: '1122334455', accountType: 'Savings', balance: 1500, currency: 'USD', state: false, clientId: '3' },
      { accountNumber: '2233445566', accountType: 'Checking', balance: 3000, currency: 'USD', state: true, clientId: '4' }
    ];
  
    get filteredAccounts(): Account[] {
      const term = this.searchTerm.toLowerCase();
      return this.accounts.filter(c =>
        c.accountNumber.toLowerCase().includes(term) ||
        c.accountType.toLowerCase().includes(term) ||
        c.clientId.includes(term)
      );
    }
  
    editAccount(account: Account) {
      console.log('Edit', account);
    }
  
    deleteAccount(account: Account) {
      console.log('Delete', account);
    }

}
