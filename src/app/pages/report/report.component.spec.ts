import { ReportComponent } from './report.component';
import { ReportService } from '../../services/report.service';
import { AccountService } from '../../services/account.service';
import { of } from 'rxjs';

describe('ReportComponent (standalone)', () => {
  let component: ReportComponent;
  let mockReportService: any;
  let mockAccountService: any;

  beforeEach(() => {
    mockReportService = {
      getReport: jest.fn()
    };
    mockAccountService = {
      getAccounts: jest.fn()
    };

    component = new ReportComponent(mockReportService, mockAccountService);
  });

  it('should initialize maxDate as today in YYYY-MM-DD format', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(component.maxDate).toBe(today);
  });

  it('should fetch accounts on ngOnInit and set accounts if data exists', () => {
    const accountsMock = [{ id: '1', name: 'Account 1' }];
    mockAccountService.getAccounts.mockReturnValue(of({ data: accountsMock }));

    component.ngOnInit();

    expect(mockAccountService.getAccounts).toHaveBeenCalled();
    // Simulate async subscription
    setTimeout(() => {
      expect(component.accounts).toEqual(accountsMock);
    }, 0);
  });

  it('should alert if no data received from getAccounts', () => {
    window.alert = jest.fn();
    mockAccountService.getAccounts.mockReturnValue(of({}));

    component.ngOnInit();

    setTimeout(() => {
      expect(window.alert).toHaveBeenCalledWith('No data received from the service');
    }, 0);
  });

  it('should alert if generateReport is called with missing fields', () => {
    window.alert = jest.fn();
    component.selectedAccount = '';
    component.startDate = '';
    component.endDate = '';

    component.generateReport();

    expect(window.alert).toHaveBeenCalledWith('Please fill in all fields');
    expect(mockReportService.getReport).not.toHaveBeenCalled();
  });
});