"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Report_1 = require("./core/Report");
var GetTransactions_1 = require("./core/GetTransactions");
exports.generateReport = function (ignoreDonuts, crystalBall, ignoreCCPayments) {
    if (ignoreDonuts === void 0) { ignoreDonuts = false; }
    if (crystalBall === void 0) { crystalBall = false; }
    if (ignoreCCPayments === void 0) { ignoreCCPayments = false; }
    GetTransactions_1.getAllTransactions().then(function (transactions) {
        var report = new Report_1.Report(transactions);
        if (crystalBall) {
            GetTransactions_1.getProjectedTransactions().then(function (projections) {
                report.addProjections(projections);
                logReport(report, ignoreDonuts, ignoreCCPayments);
            });
        }
        else {
            logReport(report, ignoreDonuts, ignoreCCPayments);
        }
    });
};
function logReport(report, ignoreDonuts, ignoreCCPayments) {
    if (ignoreDonuts) {
        report.ignoreDonuts();
    }
    if (ignoreCCPayments) {
        report.ignoreCCPayments();
    }
    var generatedReport = report.process();
    var formattedReport = formatReport(generatedReport);
    if (ignoreCCPayments) {
        formattedReport['credit-card-transactions'] = report.getCCPayments();
    }
    console.log('report on all transactions => ', formattedReport);
}
function formatReport(report) {
    var out = {};
    report.forEach(function (entry, key, map) {
        out[key] = {
            spent: "$" + entry.spent.toFixed(2),
            income: "$" + entry.income.toFixed(2)
        };
    });
    return out;
}
