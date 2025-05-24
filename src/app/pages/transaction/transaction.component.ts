import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../services/interfaces/transaction.interface';

@Component({
  selector: 'app-transaction',
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent {
  searchTerm: string = '';

  transactions: Transaction[] = [
    {
      id: '1',
      transactionType: 'DEPOSIT',
      amount: 100,
      initialBalance: 900,
      finalBalance: 1000,
      currency: 'USD',
      date: '2025-05-24',
      time: '15:16:54.495587Z',
      accountId: '1234567890'
    },
    {
      id: '2',
      transactionType: 'WITHDRAWAL',
      amount: 50,
      initialBalance: 1000,
      finalBalance: 950,
      currency: 'USD',
      date: '2025-05-25',
      time: '10:20:30.123456Z',
      accountId: '1234567890'
    }
  ];

  get filteredTransactions(): Transaction[] {
    const term = this.searchTerm.toLowerCase();
    return this.transactions.filter(t =>
      t.id.includes(term) ||
      t.transactionType.toLowerCase().includes(term) ||
      t.currency.toLowerCase().includes(term)
    );
  }

  editTransaction(transaction: Transaction) {
    console.log('Edit', transaction);
  }

  deleteTransaction(transaction: Transaction) {
    console.log('Delete', transaction);
  }
}
