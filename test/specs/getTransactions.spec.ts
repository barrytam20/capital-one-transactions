import { Transaction } from './../../src/models/Interfaces';
import { getAllTransactions, getProjectedTransactions } from './../../src/core/GetTransactions';
import test from 'ava';

test('it retreives all transactions', function*(t){
  const transactions: Array<Transaction> = yield getAllTransactions();
  t.truthy(transactions.length);
});

test('it retreives projected transactions', function*(t){
  const transactions: Array<Transaction> = yield getProjectedTransactions();
  transactions.map( (entry: Transaction) => {
    t.is(entry['is-pending'], true);
  });
});
