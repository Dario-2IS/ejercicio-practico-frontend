import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReportComponent } from './report.component';
import { ReportService } from '../../services/report.service';
import { AccountService } from '../../services/account.service';
import { of } from 'rxjs';
import { Account } from '../../services/interfaces/account.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('ReportComponent (standalone)', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;
  let mockReportService: any;
  let mockAccountService: any;

  beforeEach(async () => {
    mockReportService = {
      getReport: jest.fn()
    };
    mockAccountService = {
      getAccounts: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ReportComponent],
      providers: [
        { provide: ReportService, useValue: mockReportService },
        { provide: AccountService, useValue: mockAccountService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set maxDate to today in YYYY-MM-DD format', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(component.maxDate).toBe(today);
  });
});