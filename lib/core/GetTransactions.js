"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var config = require('./../../config/level-money-config.json');
function getAllTransactions() {
    var options = {
        url: "" + config.hostname + config.paths.getAll,
        method: 'POST',
        json: true,
        body: { args: config.args }
    };
    return new Promise(function (resolve, reject) {
        request(options, function (err, response, body) {
            if (err || response.statusCode !== 200 || body.error !== 'no-error') {
                console.log(JSON.stringify(err));
                console.log(JSON.stringify(response.status));
                reject(body.error);
            }
            else {
                resolve(body.transactions);
            }
        });
    });
}
exports.getAllTransactions = getAllTransactions;
function getProjectedTransactions() {
    var transactionDate = new Date();
    var options = {
        url: "" + config.hostname + config.paths.projected,
        method: 'POST',
        json: true,
        body: {
            args: config.args,
            year: transactionDate.getFullYear(),
            month: transactionDate.getMonth() + 1
        }
    };
    return new Promise(function (resolve, reject) {
        request(options, function (err, response, body) {
            if (err || response.statusCode !== 200 || body.error !== 'no-error') {
                console.log(JSON.stringify(err));
                console.log(JSON.stringify(response.status));
                reject(body.error);
            }
            else {
                resolve(body.transactions);
            }
        });
    });
}
exports.getProjectedTransactions = getProjectedTransactions;
