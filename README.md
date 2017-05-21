# Capital One Transactions Reporter

## Requirements
This application requires npm and node to be installed on your machine to run

## Usage

1. Run ```npm install --production``` to install required node modules
2. Run ```node transaction.js``` to generate a report of the transactions. Note that average income and average spent is the average amount of each income/spent transaction. If the user has transactions of 1,2,3,-5,-6, then the average income would be (1+2+3)/3 = 2 and the average spent would be (5+6)/2 = 5.5
3. The report will be generated in JSON form
4. The following flags can be appended in any order and in combination 

## Ignore Donuts
Run the application with ```--ignore-donuts``` flag to remove any transactions where the merchange is "Krispy Kreme Donuts" or "DUNKIN #336784" from the report

## Crystal Ball
Run the application with ```--crystal-ball``` flag to retreive the projections for the current month. The same report without the flag will be carried over, but this flag will append the projected spent and income amounts for the current month as well as the projected new average

```
  '2017-4': { spent: '$4701.17', income: '$2230.29' },
  '2017-5': { spent: '$2319.81', income: '$2237.08' },
  average: { spent: '$100.72', income: '$1387.15' },
  'projected-2017-5': { spent: '$3340.43', income: '$3947.01' },
  'projected-average': { spent: '$100.01', income: '$1391.29' } }
```

## Ignore Credit Card Payments
Run the application with ```--ignore-cc-payments``` flag to show aggregate numbers that do not reflect credit card payment transactions. The credit card transactions will be listed in the report object 

----

## Config
API login and path information as well as donut merchants are configurable in config/level-money-config.json