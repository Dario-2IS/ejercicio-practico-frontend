import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionComponent } from './transaction.component';
import { TransactionService } from '../../services/transaction.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;
  let transactionServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    transactionServiceMock = {
      getTransactions: jest.fn(),
      addTransaction: jest.fn(),
      deleteTransaction: jest.fn()
    };
    routerMock = {
      url: '/transactions',
      navigateByUrl: jest.fn().mockResolvedValue(true),
      navigate: jest.fn().mockResolvedValue(true)
    };

    await TestBed.configureTestingModule({
      imports: [TransactionComponent, ReactiveFormsModule],
      providers: [
        { provide: TransactionService, useValue: transactionServiceMock },
        { provide: Router, useValue: routerMock },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set transactions if response is valid', () => {
      const mockData = [{ id: 1, transactionType: 'DEPOSIT', date: '2024-01-01', account: { accountNumber: '1234567890' } }];
      transactionServiceMock.getTransactions.mockReturnValue(of({ data: mockData }));
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      component.ngOnInit();
      expect(component.transactions).toEqual(mockData);
    });

    it('should alert if no data received', () => {
      transactionServiceMock.getTransactions.mockReturnValue(of({}));
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      component.ngOnInit();
      expect(alertSpy).toHaveBeenCalledWith('No data received from the service');
    });

    it('should alert if data is not array', () => {
      transactionServiceMock.getTransactions.mockReturnValue(of({ data: {} }));
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      component.ngOnInit();
      expect(errorSpy).toHaveBeenCalled();
    });

    it('should alert if data array is empty', () => {
      transactionServiceMock.getTransactions.mockReturnValue(of({ data: [] }));
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      component.ngOnInit();
      expect(alertSpy).toHaveBeenCalledWith('No transactions found');
    });

    it('should handle error', () => {
      transactionServiceMock.getTransactions.mockReturnValue(throwError(() => ({ error: { message: 'fail' } })));
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      component.ngOnInit();
      expect(alertSpy).toHaveBeenCalledWith('fail');
      expect(errorSpy).toHaveBeenCalled();
    });
  });

  it('should open and close modal', () => {
    component.openModal();
    expect(component.showModal).toBe(true);
    component.closeModal();
    expect(component.showModal).toBe(false);
  });

  it('should filter transactions by searchTerm', () => {
    component.transactions = [
      {
        id: 1, transactionType: 'DEPOSIT', date: '2024-01-01', account: {
          accountNumber: '1234567890',
          accountType: '',
          balance: 0,
          currency: '',
          state: false,
          client: {
            identificationNumber: '', firstName: '',
            lastName: '',
            gender: false,
            age: 0,
            phoneNumber: '',
            address: '',
            password: '',
            state: false
          }
        },
        amount: 0,
        initialBalance: 0,
        finalBalance: 0,
        currency: '',
        time: ''
      },
      {
        id: 2, transactionType: 'WITHDRAWAL', date: '2024-01-02', account: {
          accountNumber: '0987654321',
          accountType: '',
          balance: 0,
          currency: '',
          state: false,
          client: {
            identificationNumber: '', firstName: '',
            lastName: '',
            gender: false,
            age: 0,
            phoneNumber: '',
            address: '',
            password: '',
            state: false
          }
        },
        amount: 0,
        initialBalance: 0,
        finalBalance: 0,
        currency: '',
        time: ''
      }
    ];
    component.searchTerm = 'deposit';
    expect(component.filteredTransactions.length).toBe(1);
    component.searchTerm = '0987';
    expect(component.filteredTransactions.length).toBe(1);
    component.searchTerm = '';
    expect(component.filteredTransactions.length).toBe(2);
  });

  describe('saveTransaction', () => {
    beforeEach(() => {
      jest.spyOn(component, 'closeModal').mockImplementation(() => {});
      jest.spyOn(component, 'reloadComponent').mockImplementation(() => {});
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      component.transactionForm.setValue({
        transactionType: 'DEPOSIT',
        amount: 100,
        accountNumber: '1234567890'
      });
    });

    it('should not proceed if form is invalid', () => {
      component.transactionForm.get('amount')?.setValue('');
      component.saveTransaction();
      expect(transactionServiceMock.addTransaction).not.toHaveBeenCalled();
    });

    it('should call addTransaction and push transaction on success', () => {
      transactionServiceMock.addTransaction.mockReturnValue(of({ success: true }));
      component.saveTransaction();
      expect(transactionServiceMock.addTransaction).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Transaction added successfully');
    });

    it('should alert on addTransaction error', () => {
      transactionServiceMock.addTransaction.mockReturnValue(throwError(() => ({ error: { message: 'fail' } })));
      component.saveTransaction();
      expect(window.alert).toHaveBeenCalledWith('fail');
    });

    it('should alert if addTransaction response is not success', () => {
      transactionServiceMock.addTransaction.mockReturnValue(of({ success: false }));
      component.saveTransaction();
      expect(window.alert).toHaveBeenCalledWith('Error adding transaction');
    });
  });

  describe('deleteTransaction', () => {
    beforeEach(() => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
    });

    it('should call deleteTransaction and remove transaction on success', () => {
      component.transactions = [
        {
          id: 1, transactionType: 'DEPOSIT', date: '2024-01-01', account: {
            accountNumber: '1234567890',
            accountType: '',
            balance: 0,
            currency: '',
            state: false,
            client: {
              identificationNumber: '',
              firstName: '',
              lastName: '',
              gender: false,
              age: 0,
              phoneNumber: '',
              address: '',
              password: '',
              state: false
            }
          },
          amount: 0,
          initialBalance: 0,
          finalBalance: 0,
          currency: '',
          time: ''
        }
      ];
      transactionServiceMock.deleteTransaction.mockReturnValue(of({ success: true }));
      component.deleteTransaction(component.transactions[0]);
      expect(transactionServiceMock.deleteTransaction).toHaveBeenCalledWith(1);
      expect(window.alert).toHaveBeenCalledWith('Transaction deleted successfully');
      expect(component.transactions.length).toBe(0);
    });

    it('should alert if deleteTransaction response is not success', () => {
      component.transactions = [
        {
          id: 1, transactionType: 'DEPOSIT', date: '2024-01-01', account: {
            accountNumber: '1234567890',
            accountType: '',
            balance: 0,
            currency: '',
            state: false,
            client: {
              identificationNumber: '',
              firstName: '',
              lastName: '',
              gender: false,
              age: 0,
              phoneNumber: '',
              address: '',
              password: '',
              state: false
            }
          },
          amount: 0,
          initialBalance: 0,
          finalBalance: 0,
          currency: '',
          time: ''
        }
      ];
      transactionServiceMock.deleteTransaction.mockReturnValue(of({ success: false }));
      component.deleteTransaction(component.transactions[0]);
      expect(window.alert).toHaveBeenCalledWith('Error deleting transaction');
    });

    it('should alert on deleteTransaction error', () => {
      transactionServiceMock.deleteTransaction.mockReturnValue(throwError(() => ({ error: { message: 'fail' } })));
      component.transactions = [
        {
          id: 1, transactionType: 'DEPOSIT', date: '2024-01-01', account: {
            accountNumber: '1234567890',
            accountType: '',
            balance: 0,
            currency: '',
            state: false,
            client: {
              identificationNumber: '',
              firstName: '',
              lastName: '',
              gender: false,
              age: 0,
              phoneNumber: '',
              address: '',
              password: '',
              state: false
            }
          },
          amount: 0,
          initialBalance: 0,
          finalBalance: 0,
          currency: '',
          time: ''
        }
      ];
      component.deleteTransaction(component.transactions[0]);
      expect(window.alert).toHaveBeenCalledWith('fail');
    });
  });

  it('should reload component', async () => {
    await component.reloadComponent();
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/', { skipLocationChange: true });
    expect(routerMock.navigate).toHaveBeenCalledWith(['/transactions']);
  });
});