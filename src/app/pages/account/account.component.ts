import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  accountTypes: string[] = ['Savings', 'Checking'];
  isEditMode: boolean = false;
  selectedAccount: string = '';

  constructor(private accountService: AccountService, private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      accountNumber: ['', [Validators.required, Validators.minLength(10)]],
      accountType: ['Savings', [Validators.required, Validators.minLength(3)]],
      clientIdentificationNumber: ['', [Validators.required, Validators.minLength(10)]],
      balance: [0, [Validators.required, Validators.min(0)]],
      state: [true, [Validators.required]]
    });
  }
  
  ngOnInit() {
    this.accountService.getAccounts()
    .subscribe((response: any) => {
      if (!response.data) {
        alert('No data received from the service');
        return;
      }
      if (!Array.isArray(response.data)) {
        console.error('Expected an array of accounts, but received:', response.data);
        return;
      }
      if (response.data.length === 0) {
        alert('No accounts found');
        return;
      }

      this.accounts = response.data;
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
    this.accountForm.reset();
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

      const accountData = this.accountForm.value;
      this.closeModal();
      if (this.isEditMode && this.selectedAccount) {
        this.accountService.updateAccount(accountData)
        .subscribe((response: any) => {
          if (response.success) {
            alert('Account updated:');
            const index = this.accounts.findIndex(c => c.accountNumber === accountData.accountNumber);
            if (index !== -1) {
              this.accounts[index] = accountData;
            }else {
              alert('Failed to update account');
            }
          }
        });
        this.isEditMode = false;
        this.selectedAccount = '';
        this.formSubmitted = false;
        this.accountForm.reset();
      }
      else {
        this.accountService.addAccount(accountData)
        .subscribe((response: any) => {
          if (response.success) {
            alert('Account added successfully');
            this.accounts.push(accountData);
          }else {
            alert('Failed to add account');
          }
        });
        this.accountForm.reset();
        this.formSubmitted = false;
      }
    }

    editAccount(account: Account) {
      this.isEditMode = true;
      this.selectedAccount = account.accountNumber;
      this.openModal();
      this.accountForm.patchValue({
        accountNumber: account.accountNumber,
        accountType: account.accountType,
        clientIdentificationNumber: account.client.identificationNumber,
        balance: account.balance,
        currency: account.currency,
        state: account.state
      });
    }
  
    deleteAccount(account: Account) {
      this.accountService.deleteAccount(account.accountNumber)
      .subscribe((response: any) => {
        if (response.success) {
          alert('Account deleted successfully');
          this.accounts = this.accounts.filter(c => c.accountNumber !== account.accountNumber);
        } else {
          alert('Failed to delete account');
        }
      });
    }

}
