import { EntryInfo, Transaction, ExtractedCCPayments } from './../models/Interfaces';
import { extractCCPayments } from './ExtractCCPayments';
var config = require('./../../config/level-money-config.json');

export class Report{
  private transactions: Array<Transaction>;
  private projections: Array<Transaction>;
  private ccPayments: Array<Transaction>;
  private report: Map<string, EntryInfo>;
  private totalSpent: number;
  private totalIncome: number;
  private numberOfSpent: number;
  private numberOfIncome: number;

  constructor(transactions: Array<Transaction>){
    this.transactions = transactions;
  }

  public addProjections(projections: Array<Transaction>){
    console.log('adding projections');
    this.projections = projections;
  }

  public ignoreDonuts(): void{
    console.log('ignoring donuts');
    const vendorList: Array<string> = config.donutMerchants;
    const donutMerchants: Set<string> = new Set(vendorList);
    this.transactions = this.transactions.filter( (transaction: Transaction) => {
      return !donutMerchants.has(transaction.merchant);
    });
  }

  public ignoreCCPayments(): void{
    console.log('ignoring credit card payments');
    const extractedPayments: ExtractedCCPayments = extractCCPayments(this.transactions);
    this.transactions = extractedPayments.filteredTransactions;
    this.ccPayments = extractedPayments.ccPayments;
  }

  public getCCPayments(): Array<Transaction>{
    return this.ccPayments;
  }

  public process(): Map<string, EntryInfo>{
    console.log('creating report');
    this.init();
    let key: string;
    this.transactions.map( (entry: Transaction) => {
      const transactionDate: Date = new Date(entry['transaction-time']);
      key = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}`;
      this.setEntryInfo(key, entry.amount);
    });
    this.calculateAverage('average');
    if (this.projections){
      this.processProjections();
    }
    return this.report;
  }

  private processProjections(): void{
    const current: Date = new Date();
    const currentKey: string = `${current.getFullYear()}-${current.getMonth() + 1}`;
    const currentEntry: EntryInfo = this.report.get(currentKey);
    const projectedKey: string = `projected-${currentKey}`;
    this.report.set(projectedKey, { income: currentEntry.income, spent: currentEntry.spent});
    this.projections.map( (entry: Transaction) => {
      this.setEntryInfo(projectedKey, entry.amount);
    });
    this.calculateAverage('projected-average');
  }

  private init(): void{
    this.report = new Map();
    this.totalSpent = 0;
    this.totalIncome = 0;
    this.numberOfSpent = 0;
    this.numberOfIncome = 0;
  }

  private setEntryInfo(key: string, amount: number): void{
    amount = amount / 10000;
    let entryInfo: EntryInfo = this.report.get(key) || { income: 0, spent: 0};
    if (amount > 0){
      entryInfo.income += amount;
      this.totalIncome += amount;
      this.numberOfIncome = this.numberOfIncome ? this.numberOfIncome + 1 : 1;
    } else {
      entryInfo.spent += amount * -1;
      this.totalSpent += amount * -1;
      this.numberOfSpent = this.numberOfSpent ? this.numberOfSpent + 1 : 1;
    }
    this.report.set(key, entryInfo);
  }

  private calculateAverage(key: string): void{
    const entryInfo: EntryInfo = {
      income: this.totalIncome / (this.numberOfIncome || 1),
      spent: this.totalSpent / (this.numberOfSpent || 1)
    };
    this.report.set(key, entryInfo);
  }
}
