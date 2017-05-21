import { Transaction, HttpOptions } from './../models/Interfaces';
import * as request from 'request';
var config = require('./../../config/level-money-config.json');

export function getAllTransactions(): Promise<Array<Transaction>>{
	const options: HttpOptions = {
		url: `${config.hostname}${config.paths.getAll}`,
		method: 'POST',
		json: true,
		body: {args: config.args}
	};
	return new Promise( (resolve, reject) => {
		request(options, (err, response, body) => {
			if (err || response.statusCode !== 200 || body.error !== 'no-error'){
				console.log(JSON.stringify(err));
				console.log(JSON.stringify(response.status));
				reject(body.error);
			} else {
				resolve(body.transactions);
			}
		});
	});
}

export function getProjectedTransactions(): Promise<Array<Transaction>>{
	const transactionDate: Date = new Date();
	const options: HttpOptions = {
		url: `${config.hostname}${config.paths.projected}`,
		method: 'POST',
		json: true,
		body: {
			args: config.args,
			year: transactionDate.getFullYear(),
			month: transactionDate.getMonth() + 1
		}
	};
	return new Promise( (resolve, reject) => {
		request(options, (err, response, body) => {
			if (err || response.statusCode !== 200 || body.error !== 'no-error'){
				console.log(JSON.stringify(err));
				console.log(JSON.stringify(response.status));
				reject(body.error);
			} else {
				resolve(body.transactions);
			}
		});
	});
}
