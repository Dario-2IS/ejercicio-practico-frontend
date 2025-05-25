import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '../../services/interfaces/account.interface';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  searchTerm: string = '';
  accounts: Account[] = []
  showModal = false;
  accountForm: FormGroup;
  formSubmitted: boolean = false;

  constructor(private accountService: AccountService, private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      accountNumber: ['', [Validators.required, Validators.minLength(10)]],
      accountType: ['', [Validators.required, Validators.minLength(3)]],
      clientIdentificationNumber: ['', [Validators.required, Validators.minLength(10)]],
      balance: [0, [Validators.required, Validators.min(0)]],
      currency: [true, [Validators.required]],
      state: [true, [Validators.required]]
    });
  }
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

  get accountNumber() {
    return this.accountForm.get('accountNumber');
  }
  get accountType() {
    return this.accountForm.get('accountType');
  }
  get clientIdentificationNumber() {
    return this.accountForm.get('clientId');
  }
  get balance() {
    return this.accountForm.get('balance');
  }
  get state() {
    return this.accountForm.get('state');
  }
  
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  get filteredAccounts(): Account[] {
      const term = this.searchTerm.toLowerCase();
      return this.accounts.filter(c =>
        c.accountNumber.toLowerCase().includes(term) ||
        c.accountType.toLowerCase().includes(term) ||
        c.client.identificationNumber.includes(term)
      );
    }

    saveAccount() {
      this.formSubmitted = true;
      if (this.accountForm.invalid) {
        return;
      }
      console.log('Account', this.accountForm.value);
      this.accountService.addAccount(this.accountForm.value)
        .subscribe((response: Account) => {
          if (!response) {
            console.error('No response received from the service');
            return;
          }
          if (!response.accountNumber || !response.accountType || !response.client.identificationNumber) {
            console.error('Response data is missing required properties:', response);
            return;
          }
          console.log('Account added:', response);
          this.accounts.push(this.accountForm.value);
        });
        this.accountForm.reset();
        this.formSubmitted = false;
    }

    editAccount(account: Account) {
      console.log('Edit', account);
    }
  
    deleteAccount(account: Account) {
      console.log('Delete', account);
      this.accountService.deleteAccount(account.accountNumber).subscribe((response: any) => {
        console.log('Response:', response);
        if (response == 'Account deleted successfully') {
          console.log('Account deleted successfully:', response);
          this.accounts = this.accounts.filter(c => c.accountNumber !== account.accountNumber);
        } else {
          console.error('Failed to delete account');
        }
      });
    }

}
