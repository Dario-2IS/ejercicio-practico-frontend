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

  constructor(private clientService: ClientService, private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      identificationNumber: ['', [Validators.required, Validators.minLength(10)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: [true, [Validators.required]],
      age: [null, [Validators.required, Validators.min(0)]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required]],
      state: [true, [Validators.required]]
    });
  }

  ngOnInit() {
    this.clientService.getClients()
    .subscribe((data: Client[]) => {
      if (!data) {
        console.error('No data received from the service');
        return;
      }
      if (!Array.isArray(data)) {
        console.error('Expected an array of clients, but received:', data);
        return;
      }
      console.log('Clients fetched:', data);

      if (data.length === 0) {
        console.warn('No clients found');
        return;
      }

      data.forEach(client => {
        if (!client.identificationNumber || !client.firstName || !client.lastName) {
          console.error('Client data is missing required properties:', client);
          return;
        }
      });

      this.clients = data;
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
    if (this.clientForm.invalid) {
      return;
    }
    this.formSubmitted = true;
    console.log('Cliente:', this.clientForm.value);
      this.closeModal();
      this.clientService.addClient(this.clientForm.value)
      .subscribe((response: any) => {
        console.log('Response:', response);
        if (response == 'Client created successfully') {
          console.log('Client added successfully:', response);
          this.clients.push(this.clientForm.value);
        }else {
          console.error('Failed to add client');
        }
      });
      this.clientForm.reset();
      this.formSubmitted = false;
  }

  editClient(client: Client) {
    console.log('Edit', client);
  }

  deleteClient(client: Client) {
    console.log('Delete', client);
    this.clientService.deleteClient(client.identificationNumber).subscribe((response: any) => {
      console.log('Response:', response);
      if (response == 'Client deleted successfully') {
        console.log('Client deleted successfully:', response);
        this.clients = this.clients.filter(c => c.identificationNumber !== client.identificationNumber);
      } else {
        console.error('Failed to delete client');
      }
    });
  }
}
