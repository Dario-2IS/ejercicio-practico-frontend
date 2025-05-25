import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Transaction } from '../../services/interfaces/transaction.interface';
import { TransactionService } from '../../services/transaction.service';
import e from 'express';

@Component({
  selector: 'app-transaction',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent {
  searchTerm: string = '';
  transactions: Transaction[] = [];
  showModal = false;
  transactionForm: FormGroup;
  formSubmitted: boolean = false;
  transactionTypes: string[] = ['DEPOSIT', 'WITHDRAWAL'];
  currencies: string[] = ['USD', 'EUR'];

  constructor(private transactionService: TransactionService, private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      transactionType: ['DEPOSIT', [Validators.required, Validators.minLength(3)]],
      amount: [0, [Validators.required, Validators.min(0)]],
      currency: ['USD', [Validators.required]],
      accountNumber: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.transactionService.getTransactions()
    .subscribe((response: any) => {
      if (!response.data) {
        alert('No data received from the service');
        return;
      }
      if (!Array.isArray(response.data)) {
        console.error('Expected an array of transactions, but received:', response.data);
        return;
      }
      if (response.data.length === 0) {
        alert('No transactions found');
        return;
      }
      
      this.transactions = response.data;
    });
  }


  get transactionType() {
    return this.transactionForm.get('transactionType');
  }
  get amount() {
    return this.transactionForm.get('amount');
  }
  get currency() {
    return this.transactionForm.get('currency');
  }
  get accountNumber() {
    return this.transactionForm.get('accountNumber');
  }
  
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.transactionForm.reset();
  }

  get filteredTransactions(): Transaction[] {
    const term = this.searchTerm.toLowerCase();
    return this.transactions.filter(t =>
      t.id.toString().includes(term) ||
      t.transactionType.toLowerCase().includes(term) ||
      t.currency.toLowerCase().includes(term)
    );
  }

  saveTransaction() {
    this.formSubmitted = true;
    if (this.transactionForm.invalid) {
      return;
    }

    const accountData = this.transactionForm.value;
    this.formSubmitted = true;
    this.closeModal();
    this.transactionService.addTransaction(accountData)
      .subscribe((response: any) => {
        if (response.success) {
          alert('Transaction added successfully');
          this.transactions.push(accountData);
        }else {
          alert('Error adding transaction');
        }
      });
      this.transactionForm.reset();
      this.formSubmitted = false;
  }

  deleteTransaction(transaction: Transaction) {
    this.transactionService.deleteTransaction(transaction.id)
      .subscribe((response: any) => {
        if (response.success) {
          alert('Transaction deleted successfully');
          this.transactions = this.transactions.filter(t => t.id !== transaction.id);
        } else {
          alert('Error deleting transaction');
        }
      });
  }
}
