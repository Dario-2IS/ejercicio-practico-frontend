import { Account } from "./account.interface";

export interface Transaction {
  id: number;
  transactionType: 'DEPOSIT' | 'WITHDRAWAL';
  amount: number;
  initialBalance: number;
  finalBalance: number;
  currency: string; // ISO 4217 format, e.g., "USD", "EUR"
  date: String; // ISO 8601 format, e.g., "2025-05-24"
  time: string; // ISO 8601 format, e.g., "15:16:54.495587Z"
  account: Account; // Optional field to link to an account
}