import { Transaction } from './../../src/models/Transactions';
export function getTestTransactions(): Promise<Transaction>{
  return new Promise( (resolve) => {
    resolve([{"amount":-10000,"is-pending":false,"aggregation-time":1412686740000,"account-id":"nonce:comfy-cc/hdhehe","clear-date":1412790480000,"transaction-id":"1412790480000","raw-merchant":"7-ELEVEN 23853","categorization":"Unknown","merchant":"7-Eleven 23853","transaction-time":"2014-10-07T12:59:00.000Z"},{"amount":-20000,"is-pending":false,"aggregation-time":1412702940000,"account-id":"nonce:comfy-cc/hdhehe","clear-date":1412985120000,"transaction-id":"1412985120000","raw-merchant":"SUNOCO 0299792200","categorization":"Unknown","merchant":"Sunoco","transaction-time":"2014-10-07T17:29:00.000Z"},{"amount":100000,"is-pending":false,"aggregation-time":1412733360000,"account-id":"nonce:comfy-cc/hdhehe","clear-date":1412845980000,"transaction-id":"1412845980000","raw-merchant":"Krispy Kreme Donuts","categorization":"Unknown","merchant":"Krispy Kreme Donuts","transaction-time":"2014-10-08T01:56:00.000Z"},{"amount":-20000,"is-pending":false,"aggregation-time":1412760240000,"account-id":"nonce:comfy-cc/hdhehe","clear-date":1412942220000,"transaction-id":"1412942220000","raw-merchant":"GIANT EAG 1201","categorization":"Unknown","merchant":"Giant Eag 1201","transaction-time":"2017-05-08T09:24:00.000Z"},{"amount":10000,"is-pending":false,"aggregation-time":1412764860000,"account-id":"nonce:comfy-checking/hdhehe","clear-date":1412948520000,"transaction-id":"1412948520000","raw-merchant":"AT&T BILL PAYMENT","categorization":"Unknown","merchant":"At&T Bill Payment","transaction-time":"2017-05-08T10:41:00.000Z"},{"amount":50000,"is-pending":false,"aggregation-time":1412859120000,"account-id":"nonce:comfy-checking/hdhehe","clear-date":1412909700000,"transaction-id":"1412909700000","raw-merchant":"ZENPAYROLL","categorization":"Unknown","merchant":"Zenpayroll","transaction-time":"2014-10-09T12:52:00.000Z"}]);
  });
}

export function getDonutsTransactions(): Promise<Transaction>{
  return new Promise( (resolve) => {
    resolve([{"amount":-10000,"is-pending":false,"aggregation-time":1412686740000,"account-id":"nonce:comfy-cc/hdhehe","clear-date":1412790480000,"transaction-id":"1412790480000","raw-merchant":"7-ELEVEN 23853","categorization":"Unknown","merchant":"7-Eleven 23853","transaction-time":"2014-10-07T12:59:00.000Z"},{"amount":-20000,"is-pending":false,"aggregation-time":1412702940000,"account-id":"nonce:comfy-cc/hdhehe","clear-date":1412985120000,"transaction-id":"1412985120000","raw-merchant":"SUNOCO 0299792200","categorization":"Unknown","merchant":"Sunoco","transaction-time":"2014-10-07T17:29:00.000Z"},{"amount":-100000,"is-pending":false,"aggregation-time":1412733360000,"account-id":"nonce:comfy-cc/hdhehe","clear-date":1412845980000,"transaction-id":"1412845980000","raw-merchant":"Krispy Kreme Donuts","categorization":"Unknown","merchant":"Krispy Kreme Donuts","transaction-time":"2014-10-08T01:56:00.000Z"},{"amount":-100000,"is-pending":false,"aggregation-time":1412733360000,"account-id":"nonce:comfy-cc/hdhehe","clear-date":1412845980000,"transaction-id":"1412845980000","raw-merchant":"DUNKIN #336784","categorization":"Unknown","merchant":"DUNKIN #336784","transaction-time":"2014-10-08T01:56:00.000Z"},{"amount":-100000,"is-pending":false,"aggregation-time":1412733360000,"account-id":"nonce:comfy-cc/hdhehe","clear-date":1412845980000,"transaction-id":"1412845980000","raw-merchant":"DUNKIN #336784","categorization":"Unknown","merchant":"DUNKIN #336784","transaction-time":"2014-10-08T01:56:00.000Z"},{"amount":100000,"is-pending":false,"aggregation-time":1412733360000,"account-id":"nonce:comfy-cc/hdhehe","clear-date":1412845980000,"transaction-id":"1412845980000","raw-merchant":"asdf","categorization":"Unknown","merchant":"asdfs","transaction-time":"2014-10-08T01:56:00.000Z"},{"amount":-20000,"is-pending":false,"aggregation-time":1412760240000,"account-id":"nonce:comfy-cc/hdhehe","clear-date":1412942220000,"transaction-id":"1412942220000","raw-merchant":"GIANT EAG 1201","categorization":"Unknown","merchant":"Giant Eag 1201","transaction-time":"2017-05-08T09:24:00.000Z"},{"amount":10000,"is-pending":false,"aggregation-time":1412764860000,"account-id":"nonce:comfy-checking/hdhehe","clear-date":1412948520000,"transaction-id":"1412948520000","raw-merchant":"AT&T BILL PAYMENT","categorization":"Unknown","merchant":"At&T Bill Payment","transaction-time":"2017-05-08T10:41:00.000Z"},{"amount":50000,"is-pending":false,"aggregation-time":1412859120000,"account-id":"nonce:comfy-checking/hdhehe","clear-date":1412909700000,"transaction-id":"1412909700000","raw-merchant":"ZENPAYROLL","categorization":"Unknown","merchant":"Zenpayroll","transaction-time":"2014-10-09T12:52:00.000Z"}]);
  });
}

export function getProjectedTest(): Promise<Transaction>{
  return new Promise( (resolve) => {
    resolve([{"amount":100000,"is-pending":true,"payee-name-only-for-testing":"ZENPAYROLL","aggregation-time":189302400000,"account-id":"asdfasf","clear-date":1495802940000,"memo-only-for-testing":"Example Memo","transaction-id":"pending:pending--1.0941103247862864","raw-merchant":"ZENPAYROLL","categorization":"Unknown","merchant":"Zenpayroll","transaction-time":"2017-05-26T00:00:00.000Z"},{"amount":-30000,"is-pending":true,"payee-name-only-for-testing":"SWEENEYS CHEVROLET","aggregation-time":189302400000,"account-id":"nonce:comfy-cc/hdhehe","clear-date":1495821000000,"memo-only-for-testing":"Example Memo","transaction-id":"pending:pending--1.0320723261111413","raw-merchant":"SWEENEYS CHEVROLET","categorization":"Auto","merchant":"Sweeneys Chevrolet","transaction-time":"2017-05-26T00:00:00.000Z"}]);
  });
}

export function getCCPayments(): Promise<Transaction>{
  return new Promise( (resolve) => {
    resolve([{"amount":12345,"is-pending":false,"aggregation-time":1412764860000,"account-id":"nonce:comfy-checking/hdhehe","clear-date":1412948520000,"transaction-id":"1412948529876","raw-merchant":"AT&T BILL PAYMENT","categorization":"Unknown","merchant":"At&T Bill Payment","transaction-time":"2014-10-08T10:41:00.000Z"},{"amount":-12345,"is-pending":false,"aggregation-time":1412859120000,"account-id":"nonce:comfy-checking/hdhehe","clear-date":1412909700000,"transaction-id":"1412909703939","raw-merchant":"ZENPAYROLL","categorization":"Unknown","merchant":"Zenpayroll","transaction-time":"2014-10-08T09:52:00.000Z"},{"amount":54321,"is-pending":false,"aggregation-time":1412764860000,"account-id":"nonce:comfy-checking/hdhehe","clear-date":1412948520000,"transaction-id":"1412948529876","raw-merchant":"AT&T BILL PAYMENT","categorization":"Unknown","merchant":"At&T Bill Payment","transaction-time":"2017-02-08T10:41:00.000Z"},{"amount":-54321,"is-pending":false,"aggregation-time":1412859120000,"account-id":"nonce:comfy-checking/hdhehe","clear-date":1412909700000,"transaction-id":"1412909703939","raw-merchant":"ZENPAYROLL","categorization":"Unknown","merchant":"Zenpayroll","transaction-time":"2017-02-08T09:52:00.000Z"}]);
  });
}