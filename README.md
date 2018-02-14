# n1ql2csv

Executes a given N1QL query and exports the results as CSV

![](https://d3vv6lp55qjaqc.cloudfront.net/items/1s0d3F3A2g3p0s1m3s1V/Screen%20Recording%202018-02-14%20at%2005.16%20PM.gif?X-CloudApp-Visitor-Id=1639251&v=57b3bdb8)

## Install

Install `n1ql2csv` globally

```bash
npm install n1ql2csv -g
```

Requires Node, if you don't have node, you can install `nvm`  by issuing the following command.

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

then

```bash
nvm install 9
```

## Usage

```bash
n1ql2csv --help

  Usage: n1ql2csv [options]

  This will execute a N1QL query and export the results into a csv file


  Options:

    -V, --version        output the version number
    -c, --cluster <s>    The cluster address (default: localhost)
    -s, --secure <b>     Whether or not to use http(s) (default: false)
    -p, --port <n>       The query port to use (default: 8093)
    -u, --username <s>   Cluster Admin or RBAC username (default: Administrator)
    -p, --password <s>   Cluster Admin or RBAC password (default: password)
    -s, --statement <s>  A N1QL statement or file path to a N1QL query
    -o, --output <s>     The destination output file (default: /home/centos/results.csv)
    -x, --overwrite <b>  Overwrite the destination file if it exists already (default: false)
    -t, --timeout <n>    Timeout in milliseconds for the query (default: 10000)
    -d, --delimiter <s>  The delimiter to use (default: ,)
    -h, --headers <b>    Whether or not there should be column headers (default: true)
    -h, --help           output usage information
```

## Example

```bash
n1ql2csv \
  --cluster localhost \
  --username Administrator \
  --password password \
  --statement "SELECT airportname, city, country, faa, icao, id, type, tz FROM \`travel-sample\` AS airports WHERE type ='airport' ORDER BY airportname ASC" \
  --output somedir/results.csv \
  --overwrite true
```
