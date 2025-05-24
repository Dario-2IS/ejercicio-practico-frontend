import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client } from '../../services/interfaces/client.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client',
  imports: [CommonModule, FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
  searchTerm: string = '';

  clients: Client[] = [
    { identification: '1234567890', firstName: 'Juan', lastName: 'Pérez', gender: true, age: 30, phoneNumber: '1234567890', address: 'Calle Falsa 123', password: 'password', state: true },
    { identification: '0987654321', firstName: 'María', lastName: 'Gómez', gender: false, age: 25, phoneNumber: '0987654321', address: 'Avenida Siempre Viva 742', password: 'password', state: true },
    { identification: '1122334455', firstName: 'Carlos', lastName: 'López', gender: true, age: 40, phoneNumber: '1122334455', address: 'Boulevard de los Sueños Rotos 456', password: 'password', state: false }
  ];

  get filteredClients(): Client[] {
    const term = this.searchTerm.toLowerCase();
    return this.clients.filter(c =>
      c.identification.toLowerCase().includes(term) ||
      c.firstName.toLowerCase().includes(term) ||
      c.lastName.includes(term)
    );
  }

  editClient(client: Client) {
    console.log('Edit', client);
  }

  deleteClient(client: Client) {
    console.log('Delete', client);
  }
}
