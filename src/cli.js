// imports
import commander from 'commander'
import ora from 'ora'
import n1ql2csv from './index'
import { disconnect } from './db'

// setup cli options
commander
  .version('0.1.0')
  .description('This will execute a N1QL query and export the results into a csv file')
  .option(
    '-c, --cluster <s>',
    'The cluster address',
    'localhost',
  )
  .option(
    '-b, --bucket <s>',
    'The bucket to use',
    'default',
  )
  .option(
    '-u, --username <s>',
    'The RBAC username to use (only needed for Couchbase Server 5+)',
  )
  .option(
    '-p, --password <s>',
    'The bucket or RBAC password if applicable',
  )
  .option(
    '-q, --query <s>',
    'A N1QL statement or file path to a N1QL query',
  )
  .option(
    '-o, --output <s>',
    'The destination output file',
    `${process.cwd()}/results.csv`,
  )
  .option(
    '-x, --overwrite <b>',
    'Overwrite the destination file if it exists already',
    false,
  )
  .option(
    '-t, --timeout <n>',
    'Timeout in seconds for the query',
    (val) => parseInt(val, 10),
    10,
  )
  .option(
    '-d, --delimiter <s>',
    'The delimiter to use',
    ',',
  )
  .option(
    '-h, --headers <b>',
    'Whether or not there should be column headers',
    true,
  )
  .parse(process.argv)

export default async function () {
  // Spinner for fun
  const spinner = ora({
    color: 'red',
    stream: process.stdout,
    text: 'Running...',
  })
    .start()
  try {
    await n1ql2csv(commander)
    spinner.stop()
    await disconnect()
    process.exit(0)
  } catch (err) {
    spinner.stop()
    await disconnect()
    // eslint-disable-next-line no-console
    console.error(`Error: ${err.message}`)
    process.exit(1)
  }
}
