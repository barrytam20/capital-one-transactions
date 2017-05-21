import { EntryInfo, Transaction } from './../models/Interfaces';
export declare class Report {
    private transactions;
    private projections;
    private ccPayments;
    private report;
    private totalSpent;
    private totalIncome;
    private numberOfSpent;
    private numberOfIncome;
    constructor(transactions: Array<Transaction>);
    addProjections(projections: Array<Transaction>): void;
    ignoreDonuts(): void;
    ignoreCCPayments(): void;
    getCCPayments(): Array<Transaction>;
    process(): Map<string, EntryInfo>;
    private processProjections();
    private init();
    private setEntryInfo(key, amount);
    private calculateAverage(key);
}
