var main = require('./lib/main');
var argv = require('minimist')(process.argv.slice(2));

main.generateReport(argv['ignore-donuts'], argv['crystal-ball'], argv['ignore-cc-payments']);