import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientComponent } from './client.component';
import { ClientService } from '../../services/client.service';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { Client } from '../../services/interfaces/client.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock de clientes
const mockClients: Client[] = [
  {
    identificationNumber: '1234567890',
    firstName: 'Juan',
    lastName: 'Pérez',
    gender: true,
    age: 30,
    phoneNumber: '0987654321',
    address: 'Calle falsa 123',
    password: 'secret',
    state: true
  }
];

// Mock del servicio
const mockClientService = {
  getClients: jest.fn().mockReturnValue(of({ data: mockClients }))
};

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ClientComponent, // standalone component
        ReactiveFormsModule,
        CommonModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ClientService, useValue: mockClientService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});
