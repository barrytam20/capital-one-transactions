import { EntryInfo, Transaction } from './models/Interfaces';
import { Report } from './core/Report';
import { getAllTransactions, getProjectedTransactions} from './core/GetTransactions';

exports.generateReport = (ignoreDonuts: boolean = false, 
                          crystalBall: boolean = false,
                          ignoreCCPayments: boolean = false ) => {
  getAllTransactions().then( (transactions: Array<Transaction>) => {
    const report: Report = new Report(transactions);
    if (crystalBall){
      getProjectedTransactions().then((projections: Array<Transaction>) => {
        report.addProjections(projections);
        logReport(report, ignoreDonuts, ignoreCCPayments);
      });
    } else {
      logReport(report, ignoreDonuts, ignoreCCPayments);
    }
    
  });
};

function logReport(report: Report, ignoreDonuts: boolean, ignoreCCPayments: boolean): void{
  if (ignoreDonuts){
    report.ignoreDonuts();
  }
  if (ignoreCCPayments){
    report.ignoreCCPayments();
  }  

  const generatedReport: Map<string, EntryInfo> = report.process();
  const formattedReport: object = formatReport(generatedReport);
  if (ignoreCCPayments){
    formattedReport['credit-card-transactions'] = report.getCCPayments();
  }
  console.log('report on all transactions => ', formattedReport);
}

function formatReport(report: Map<string, EntryInfo>): object{
  const out: object = {};
  report.forEach((entry: EntryInfo, key: string, map: Map<string, EntryInfo>) => {
    out[key] = {
      spent: `$${entry.spent.toFixed(2)}`,
      income: `$${entry.income.toFixed(2)}`
    };
  });
  return out;
}

