import { Transaction, ExtractedCCPayments } from './../../src/models/Interfaces';
import { getTestTransactions, getCCPayments } from './../fixtures/transactions-fixture';
import { extractCCPayments } from './../../src/core/ExtractCCPayments';
import { getAllTransactions } from './../../src/core/GetTransactions';
import test from 'ava';

test('should be able to extract cc payments transactions', function*(t){
  const filteredTransactions: Array<Transaction> = yield getTestTransactions();
  const ccPayments: Array<Transaction> = yield getCCPayments();

  const filteredObject: ExtractedCCPayments = yield extractCCPayments(filteredTransactions.concat(ccPayments));
  t.deepEqual(sortArray(filteredTransactions), filteredObject.filteredTransactions);
  t.deepEqual(sortArray(ccPayments), filteredObject.ccPayments);
});

test('should be able to extract cc payments transactions from API', function*(t){
  const allTransactions: Array<Transaction> = yield getAllTransactions();
  
  const filteredObject: ExtractedCCPayments = yield extractCCPayments(allTransactions);
  console.log(`lengths ${allTransactions.length} ${filteredObject.ccPayments.length} ${filteredObject.filteredTransactions.length}`);

  let sum: number = 0;
  filteredObject.ccPayments.map((payment: Transaction) => { 
    sum += payment.amount;
  });

  t.is(sum, 0);
});

function sortArray(transactions: Array<Transaction>): Array<Transaction>{
  return transactions.sort((a: Transaction, b: Transaction) => {
    return a['transaction-time'] > b['transaction-time'] ? 1 : -1;
  });
}  
