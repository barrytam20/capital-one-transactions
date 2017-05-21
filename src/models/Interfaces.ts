export interface Transaction{
    amount: number;
    'is-pending': boolean;
    'aggregation-time': number;
    'account-id': string;
    'clear-date': number;
    'transaction-id': string;
    'raw-merchant': string;
    categorization: string;
    merchant: string;
    'transaction-time': string;
}

export interface HttpOptions{
  url: string;
  method: string;
  headers?: object;
  json?: boolean;
  body?: object;
}

export interface EntryInfo{
    spent: number;
    income: number;
}

export interface ExtractedCCPayments{
    filteredTransactions: Array<Transaction>;
    ccPayments: Array<Transaction>;
}
