# n1ql2csv

Executes a given N1QL query and exports the results as CSV

![](https://d3vv6lp55qjaqc.cloudfront.net/items/1p1N1w3o313p1t2I0R1B/Screen%20Recording%202018-02-09%20at%2010.23%20AM.gif?X-CloudApp-Visitor-Id=1639251&v=163cb047)

## Install

```bash
npm install n1ql2json -g
```

## Usage

```bash
n1ql2csv \
  --cluster localhost \
  --bucket "travel-sample" \
  --username Administrator \
  --password password \
  --query "SELECT airports.* FROM \`travel-sample\` AS airports WHERE type ='airport' ORDER BY airports.airportname ASC" \
  --output test/blah.csv \
  --overwrite true
```
