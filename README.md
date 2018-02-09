# n1ql2csv

Executes a given N1QL query and exports the results as CSV

![](https://d3vv6lp55qjaqc.cloudfront.net/items/1p1N1w3o313p1t2I0R1B/Screen%20Recording%202018-02-09%20at%2010.23%20AM.gif?X-CloudApp-Visitor-Id=1639251&v=163cb047)

### Install

```bash
npm install n1ql2csv -g
```

### Usage

```bash
n1ql2csv --help

  Usage: n1ql2csv [options]

  This will execute a N1QL query and export the results into a csv file


  Options:

    -V, --version        output the version number
    -c, --cluster <s>    The cluster address (default: localhost)
    -b, --bucket <s>     The bucket to use (default: default)
    -u, --username <s>   The RBAC username to use (only needed for Couchbase Server 5+)
    -p, --password <s>   The bucket or RBAC password if applicable
    -q, --query <s>      A N1QL statement or file path to a N1QL query
    -o, --output <s>     The destination output file (default: results.csv)
    -x, --overwrite <b>  Overwrite the destination file if it exists already (default: false)
    -t, --timeout <n>    Timeout in seconds for the query (default: 10)
    -d, --delimiter <s>  The delimiter to use (default: ,)
    -h, --headers <b>    Whether or not there should be column headers (default: true)
    -h, --help           output usage information
```

### Example

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
