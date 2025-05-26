import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client } from '../../services/interfaces/client.interface';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
  providers: [ClientService]
})
export class ClientComponent {
  searchTerm: string = '';
  clients: Client[] = [];
  showModal = false;
  clientForm: FormGroup;
  formSubmitted: boolean = false;
  isEditMode: boolean = false;
  selectedClientId: string = '';

  constructor(private clientService: ClientService, private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      identificationNumber: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
      gender: [true, [Validators.required]],
      age: [null, [Validators.required, Validators.min(0)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      state: [true, [Validators.required]]
    });
  }

  ngOnInit() {
    this.clientService.getClients()
    .subscribe((response: any) => {
      if (!response) {
        alert('No data received from the service');
        return;
      }
      if (!Array.isArray(response.data)) {
        console.error('Expected an array of clients, but received:', response.data);
        return;
      }

      if (response.data.length === 0) {
        alert('No clients found');
        return;
      }

      this.clients = response.data;
    });
  }

  get identificationNumber() {
    return this.clientForm.get('identificationNumber');
  }
  get firstName() {
    return this.clientForm.get('firstName');
  }
  get lastName() {
    return this.clientForm.get('lastName');
  }
  get gender() {
    return this.clientForm.get('gender');
  }
  get age() {
    return this.clientForm.get('age');
  }
  get phoneNumber() {
    return this.clientForm.get('phoneNumber');
  }
  get address() {
    return this.clientForm.get('address');
  }
  get password() {
    return this.clientForm.get('password');
  }
  get state() {
    return this.clientForm.get('state');
  }
  
  get filteredClients(): Client[] {
    const term = this.searchTerm.toLowerCase();
    return this.clients.filter(c =>
      c.identificationNumber.toLowerCase().includes(term) ||
      c.firstName.toLowerCase().includes(term) ||
      c.lastName.includes(term)
    );
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.clientForm.reset();
  }

  saveClient() {
    this.formSubmitted = true;
    if (this.clientForm.invalid) {
      return;
    }

    const clientData = this.clientForm.value;
    this.closeModal();
    if (this.isEditMode && this.selectedClientId) {
      this.clientService.updateClient(clientData)
      .subscribe((response: any) => {
        if (response.success) {
          alert('Client updated successfully');
          const index = this.clients.findIndex(c => c.identificationNumber === clientData.identificationNumber);
          if (index !== -1) {
            this.clients[index] = clientData;
          }
        } else {
          alert('Failed to update client');
        }
      });
      this.clientForm.reset();
      this.formSubmitted = false;
      this.isEditMode = false;
      this.selectedClientId = '';
    }
    else {
      this.clientService.addClient(clientData)
      .subscribe((response: any) => {
        if (response.success) {
          alert('Client added successfully');
          this.clients.push(clientData);
        }else {
          alert('Failed to add client');
        }
      });
      this.clientForm.reset();
      this.formSubmitted = false;
    }
  }

  editClient(client: Client) {
    this.isEditMode = true;
    this.selectedClientId = client.identificationNumber;
    this.openModal();
    this.clientForm.patchValue({
      identificationNumber: client.identificationNumber,
      firstName: client.firstName,
      lastName: client.lastName,
      gender: client.gender,
      age: client.age,
      phoneNumber: client.phoneNumber,
      address: client.address,
      password: client.password,
      state: client.state
    });
  }

  deleteClient(client: Client) {
    this.clientService.deleteClient(client.identificationNumber)
    .subscribe((response: any) => {
      if (response.success) {
        alert('Client deleted successfully');
        this.clients = this.clients.filter(c => c.identificationNumber !== client.identificationNumber);
      } else {
        alert('Failed to delete client');
      }
    });
  }
}
