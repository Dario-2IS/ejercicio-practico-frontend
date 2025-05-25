import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Transaction } from '../../services/interfaces/transaction.interface';
import { TransactionService } from '../../services/transaction.service';

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
    .subscribe((data: Transaction[]) => {
      if (!data) {
        console.error('No data received from the service');
        return;
      }
      if (!Array.isArray(data)) {
        console.error('Expected an array of transactions, but received:', data);
        return;
      }
      console.log('Transactions fetched:', data);
      if (data.length === 0) {
        console.warn('No transactions found');
        return;
      }
      data.forEach(transaction => {
        if (!transaction.id || !transaction.transactionType || !transaction.amount) {
          console.error('Transaction data is missing required properties:', transaction);
          return;
        }
      });
      this.transactions = data;
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
  }

  saveTransaction() {
    this.formSubmitted = true;
    if (this.transactionForm.invalid) {
      console.error('Form is invalid');
      return;
    }
    this.formSubmitted = true;
    console.log('Form submitted:', this.transactionForm.value);
    this.showModal = false; 
    this.transactionService.addTransaction(this.transactionForm.value)
      .subscribe((response: Transaction) => {
        if (!response) {
          console.error('No response received from the service');
          return;
        }
        if (!response.id || !response.transactionType || !response.amount) {
          console.error('Transaction data is missing required properties:', response);
          return;
        }
        console.log('Transaction added:', response);
        this.transactions.push(response);
      });
      this.transactionForm.reset();
      this.formSubmitted = false;
  }
  get filteredTransactions(): Transaction[] {
    const term = this.searchTerm.toLowerCase();
    return this.transactions.filter(t =>
      t.id.toString().includes(term) ||
      t.transactionType.toLowerCase().includes(term) ||
      t.currency.toLowerCase().includes(term)
    );
  }

  deleteTransaction(transaction: Transaction) {
    console.log('Delete', transaction);
    this.transactionService.deleteTransaction(transaction.id)
      .subscribe((response: Transaction) => {
        if (!response) {
          console.error('No response received from the service');
          return;
        }
        if (!response.id) {
          console.error('Transaction data is missing required properties:', response);
          return;
        }
        console.log('Transaction deleted:', response);
        this.transactions = this.transactions.filter(t => t.id !== transaction.id);
      });
  }
}
