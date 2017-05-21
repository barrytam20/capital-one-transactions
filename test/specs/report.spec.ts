import { Transaction, EntryInfo } from './../../src/models/Interfaces';
import { Report } from './../../src/core/Report';
import { getAllTransactions, getProjectedTransactions } from './../../src/core/GetTransactions';
import { getTestTransactions, getDonutsTransactions, getProjectedTest, getCCPayments } from './../fixtures/transactions-fixture';
import test from 'ava';

test('it generates a report with no transactions', function*(t){
  const report: Report = new Report([]);
  const all: Map<string, EntryInfo> = report.process();
  console.log(`report`, all);
  t.is(all.get('average').income, 0);
  t.is(all.get('average').spent, 0);
});

test('it generates a general report from API', function*(t){
  const transactions: Array<Transaction> = yield getAllTransactions();
  const report: Report = new Report(transactions);
  const all: Map<string, EntryInfo> = report.process();

  const aveages: Array<number> = getAverages(transactions);

  t.is(all.get('average').income, aveages[0]);
  t.is(all.get('average').spent, aveages[1]);

  report.ignoreDonuts();
  const withoutDonuts: Map<string, EntryInfo> = report.process();
  t.is(all.get('average').income, withoutDonuts.get('average').income);
});

test('it generates a report with projections from API', function*(t){
  const transactions: Array<Transaction> = yield getAllTransactions();
  const projections: Array<Transaction> = yield getProjectedTransactions();
  const report: Report = new Report(transactions);
  report.addProjections(projections);

  const generatedReport: Map<string, EntryInfo> = report.process();

  const aveages: Array<number> = getAverages(transactions);
  t.is(generatedReport.get('average').income, aveages[0]);
  t.is(generatedReport.get('average').spent, aveages[1]);  
  const projectedAverages: Array<number> = getAverages(transactions.concat(projections));
  t.is(generatedReport.get('projected-average').income, projectedAverages[0]);
  t.is(generatedReport.get('projected-average').spent, projectedAverages[1]);    
});

test('it generates a report with test transactions', function*(t){
  const transactions: Array<Transaction> = yield getTestTransactions();
  const report: Report = new Report(transactions);
  const all: Map<string, EntryInfo> = report.process();
  console.log(`report`, all);
  t.is(all.get('2014-10').income, 15);
  t.is(all.get('2014-10').spent, 3);
  t.is(all.get('2017-5').income, 1);
  t.is(all.get('2017-5').spent, 2);
  t.is(all.get('average').income, 16 / 3);
  t.is(all.get('average').spent, 5 / 3);
});

test('it generates a report with ignore donuts transactions', function*(t){
  const transactions: Array<Transaction> = yield getDonutsTransactions();
  const report: Report = new Report(transactions);
  report.ignoreDonuts();
  const all: Map<string, EntryInfo> = report.process();
  console.log(`report`, all);
  t.is(all.get('2014-10').income, 15);
  t.is(all.get('2014-10').spent, 3);
  t.is(all.get('2017-5').income, 1);
  t.is(all.get('2017-5').spent, 2);
  t.is(all.get('average').income, 16 / 3);
  t.is(all.get('average').spent, 5 / 3);
});

test('it generates a report with projected transactions', function*(t){
  const transactions: Array<Transaction> = yield getTestTransactions();
  const report: Report = new Report(transactions);
  const projections: Array<Transaction> = yield getProjectedTest();
  report.addProjections(projections);
  const all: Map<string, EntryInfo> = report.process();

  console.log(`report`, all);
  t.is(all.get('2014-10').income, 15);
  t.is(all.get('2014-10').spent, 3);
  t.is(all.get('2017-5').income, 1);
  t.is(all.get('2017-5').spent, 2);
  t.is(all.get('average').income, 16 / 3);
  t.is(all.get('average').spent, 5 / 3);

  t.is(all.get('projected-2017-5').income, 11);
  t.is(all.get('projected-2017-5').spent, 5);
  const averages: Array<number> = getAverages(transactions.concat(projections));
  t.is(all.get('projected-average').income, averages[0]);
  t.is(all.get('projected-average').spent, averages[1]);
});

test('it generates a report without credit card payments', function*(t){
  const testTransactions: Array<Transaction> = yield getTestTransactions();
  const ccPayments: Array<Transaction> = yield getCCPayments();
  const transactions: Array<Transaction> = testTransactions.concat(ccPayments);
  const report: Report = new Report(transactions);
  report.ignoreCCPayments();

  const generatedReport: Map<string, EntryInfo> = report.process();
  console.log('no cc payments => ', generatedReport);
  t.is(generatedReport.get('2014-10').income, 15);
  t.is(generatedReport.get('2014-10').spent, 3);
  t.is(generatedReport.get('2017-5').income, 1);
  t.is(generatedReport.get('2017-5').spent, 2);
  t.is(generatedReport.get('average').income, 16 / 3);
  t.is(generatedReport.get('average').spent, 5 / 3);

  t.deepEqual(sortArray(ccPayments), report.getCCPayments());
});

function getAverages(transactions: Array<Transaction>): Array<number>{
  let incomes: Array<number> = [];
  let spents: Array<number> = [];
  transactions.map((transaction: Transaction) => {
    if (transaction.amount > 0){
      incomes.push(transaction.amount/10000);
    } else {
      spents.push(transaction.amount/10000 * -1);
    }
  });
  let avgIncomes = incomes.reduce(function(a, b) { return a + b; }) / incomes.length;
  let avgSpents = spents.reduce(function(a, b) { return a + b; }) / spents.length;

  return [avgIncomes, avgSpents];
}

function sortArray(transactions: Array<Transaction>): Array<Transaction>{
  return transactions.sort((a: Transaction, b: Transaction) => {
    return a['transaction-time'] > b['transaction-time'] ? 1 : -1;
  });
}
