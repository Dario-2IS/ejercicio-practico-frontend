export interface Transaction {
  id: string;
  transactionType: 'DEPOSIT' | 'WITHDRAWAL';
  amount: number;
  initialBalance: number;
  finalBalance: number;
  currency: string; // ISO 4217 format, e.g., "USD", "EUR"
  date: String; // ISO 8601 format, e.g., "2025-05-24"
  time: string; // ISO 8601 format, e.g., "15:16:54.495587Z"
  accountId?: string; // Optional field to link to an account
}