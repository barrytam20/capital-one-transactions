"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExtractCCPayments_1 = require("./ExtractCCPayments");
var config = require('./../../config/level-money-config.json');
var Report = (function () {
    function Report(transactions) {
        this.transactions = transactions;
    }
    Report.prototype.addProjections = function (projections) {
        console.log('adding projections');
        this.projections = projections;
    };
    Report.prototype.ignoreDonuts = function () {
        console.log('ignoring donuts');
        var vendorList = config.donutMerchants;
        var donutMerchants = new Set(vendorList);
        this.transactions = this.transactions.filter(function (transaction) {
            return !donutMerchants.has(transaction.merchant);
        });
    };
    Report.prototype.ignoreCCPayments = function () {
        console.log('ignoring credit card payments');
        var extractedPayments = ExtractCCPayments_1.extractCCPayments(this.transactions);
        this.transactions = extractedPayments.filteredTransactions;
        this.ccPayments = extractedPayments.ccPayments;
    };
    Report.prototype.getCCPayments = function () {
        return this.ccPayments;
    };
    Report.prototype.process = function () {
        var _this = this;
        console.log('creating report');
        this.init();
        var key;
        this.transactions.map(function (entry) {
            var transactionDate = new Date(entry['transaction-time']);
            key = transactionDate.getFullYear() + "-" + (transactionDate.getMonth() + 1);
            _this.setEntryInfo(key, entry.amount);
        });
        this.calculateAverage('average');
        if (this.projections) {
            this.processProjections();
        }
        return this.report;
    };
    Report.prototype.processProjections = function () {
        var _this = this;
        var current = new Date();
        var currentKey = current.getFullYear() + "-" + (current.getMonth() + 1);
        var currentEntry = this.report.get(currentKey);
        var projectedKey = "projected-" + currentKey;
        this.report.set(projectedKey, { income: currentEntry.income, spent: currentEntry.spent });
        this.projections.map(function (entry) {
            _this.setEntryInfo(projectedKey, entry.amount);
        });
        this.calculateAverage('projected-average');
    };
    Report.prototype.init = function () {
        this.report = new Map();
        this.totalSpent = 0;
        this.totalIncome = 0;
        this.numberOfSpent = 0;
        this.numberOfIncome = 0;
    };
    Report.prototype.setEntryInfo = function (key, amount) {
        amount = amount / 10000;
        var entryInfo = this.report.get(key) || { income: 0, spent: 0 };
        if (amount > 0) {
            entryInfo.income += amount;
            this.totalIncome += amount;
            this.numberOfIncome = this.numberOfIncome ? this.numberOfIncome + 1 : 1;
        }
        else {
            entryInfo.spent += amount * -1;
            this.totalSpent += amount * -1;
            this.numberOfSpent = this.numberOfSpent ? this.numberOfSpent + 1 : 1;
        }
        this.report.set(key, entryInfo);
    };
    Report.prototype.calculateAverage = function (key) {
        var entryInfo = {
            income: this.totalIncome / (this.numberOfIncome || 1),
            spent: this.totalSpent / (this.numberOfSpent || 1)
        };
        this.report.set(key, entryInfo);
    };
    return Report;
}());
exports.Report = Report;
