import { Client } from "./client.interface";

export interface Account {
    accountNumber: string;
    accountType: string;
    balance: number;
    currency: string;
    state: boolean;
    client: Client;
}