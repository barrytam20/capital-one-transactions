"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extractCCPayments(transactions) {
    transactions = transactions.sort(function (a, b) {
        return a['transaction-time'] > b['transaction-time'] ? 1 : -1;
    });
    var ccPayments = [];
    for (var i = 0; i < transactions.length - 1; i++) {
        for (var j = i + 1; j < transactions.length; j++) {
            if (hoursDifference(transactions[j]['transaction-time'], transactions[i]['transaction-time']) > 24) {
                break;
            }
            else if (!(transactions[i].amount + transactions[j].amount)) {
                ccPayments.push.apply(ccPayments, transactions.splice(i, 1));
                ccPayments.push.apply(ccPayments, transactions.splice(j - 1, 1));
                i--;
                break;
            }
        }
    }
    return ({
        filteredTransactions: transactions,
        ccPayments: ccPayments
    });
}
exports.extractCCPayments = extractCCPayments;
function hoursDifference(firstDate, secondDate) {
    return ((new Date(firstDate).valueOf()) - (new Date(secondDate).valueOf())) / 3600000;
}
