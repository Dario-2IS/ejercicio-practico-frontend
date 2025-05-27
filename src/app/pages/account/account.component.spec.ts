import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Account } from '../../services/interfaces/account.interface';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let mockAccountService: any;
  let mockRouter: any;

  const mockAccounts: Account[] = [
    {
      accountNumber: '1234567890',
      accountType: 'Ahorros',
      client: {
        identificationNumber: '0987654321',
        firstName: '',
        lastName: '',
        gender: false,
        age: 0,
        phoneNumber: '',
        address: '',
        password: '',
        state: false
      },
      balance: 1000,
      currency: 'USD',
      state: true
    }
  ];

  beforeEach(async () => {
    mockAccountService = {
      getAccounts: jest.fn().mockReturnValue(of({ data: mockAccounts })),
      addAccount: jest.fn().mockReturnValue(of({ success: true })),
      updateAccount: jest.fn().mockReturnValue(of({ success: true })),
      deleteAccount: jest.fn().mockReturnValue(of({ success: true }))
    };
    mockRouter = {
      url: '/account',
      navigateByUrl: jest.fn().mockResolvedValue(true),
      navigate: jest.fn().mockResolvedValue(true)
    };

    await TestBed.configureTestingModule({
      imports: [AccountComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AccountService, useValue: mockAccountService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch accounts on init', () => {
    expect(mockAccountService.getAccounts).toHaveBeenCalled();
    expect(component.accounts.length).toBe(1);
  });

  it('should filter accounts by searchTerm', () => {
    component.searchTerm = '1234';
    expect(component.filteredAccounts.length).toBe(1);
    component.searchTerm = 'no-match';
    expect(component.filteredAccounts.length).toBe(0);
  });

  it('should open and close modal', () => {
    component.openModal();
    expect(component.showModal).toBe(true);
    component.closeModal();
    expect(component.showModal).toBe(false);
  });

  it('should not save account if form is invalid', () => {
    component.accountForm.patchValue({ accountNumber: '' });
    component.saveAccount();
    expect(mockAccountService.addAccount).not.toHaveBeenCalled();
  });

  it('should add account if form is valid', fakeAsync(() => {
    component.accountForm.patchValue({
      accountNumber: '0987654321',
      accountType: 'Ahorros',
      clientIdentificationNumber: '1234567890',
      balance: 100,
      state: true
    });
    component.isEditMode = false;
    component.saveAccount();
    tick();
    expect(mockAccountService.addAccount).toHaveBeenCalled();
  }));

});