import { Transaction, ExtractedCCPayments } from './../models/Interfaces';

export function extractCCPayments(transactions: Array<Transaction>): ExtractedCCPayments{
  transactions = transactions.sort((a: Transaction, b: Transaction) => {
    return a['transaction-time'] > b['transaction-time'] ? 1 : -1;
  });
  const ccPayments: Array<Transaction> = [];
  for (let i: number = 0; i < transactions.length - 1; i++){
    for (let j = i + 1; j < transactions.length ; j++){
      if (hoursDifference(transactions[j]['transaction-time'], transactions[i]['transaction-time']) > 24){
        break;
      } else if (!(transactions[i].amount + transactions[j].amount)){
        ccPayments.push(...transactions.splice(i, 1));
        ccPayments.push(...transactions.splice(j - 1, 1));
        i--;
        break;
      }
    }
  }
  return({
    filteredTransactions: transactions,
    ccPayments: ccPayments
  });
}

function hoursDifference(firstDate: string, secondDate: string): number{
  return ((new Date(firstDate).valueOf()) - (new Date(secondDate).valueOf())) / 3600000;
}
