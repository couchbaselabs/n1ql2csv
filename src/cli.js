// imports
import commander from 'commander'
import ora from 'ora'
import notifier from 'update-notifier'
import n1ql2csv from './index'
import pkg from '../package.json'

notifier({ pkg })
  .notify()

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
    '-s, --secure <b>',
    'Whether or not to use http(s)',
    false,
  )
  .option(
    '-p, --port <n>',
    'The query port to use',
    8093,
    (val) => parseInt(val, 10),
  )
  .option(
    '-u, --username <s>',
    'Cluster Admin or RBAC username',
    'Administrator',
  )
  .option(
    '-p, --password <s>',
    'Cluster Admin or RBAC password',
    'password',
  )
  .option(
    '-s, --statement <s>',
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
    'Timeout in milliseconds for the query',
    (val) => parseInt(val, 10),
    10000,
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
    process.exit(0)
  } catch (err) {
    spinner.stop()
    // eslint-disable-next-line no-console
    console.error(`Error: ${err.message}`)
    process.exit(1)
  }
}
