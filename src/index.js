import { N1qlQuery } from 'couchbase'
import json2csv from 'json2csv'
import path from 'path'
import fs from 'fs-extra'
import { connect } from './db'

export default async function n1ql2csv ({
  cluster,
  bucket,
  username,
  password,
  query,
  output,
  overwrite,
  timeout,
  delimiter,
  headers,
}) {
  // connect to couchbase and execute the query
  const cb = await connect({
    cluster,
    bucket,
    timeout,
    username,
    password,
  })
  const statement = N1qlQuery.fromString(query)
  const results = await cb.queryAsync(statement)

  // output the results to csv file
  const csv = json2csv({
    data: results,
    del: delimiter,
    hasCSVColumnTitle: headers,
  })
  const output_path = !path.isAbsolute(output) ? path.join(process.cwd(), output) : output
  // make sure the output directory exists
  await fs.ensureDir(path.dirname(output_path))
  // if the file exists already throw an error
  if (await fs.pathExists(output_path)) {
    if (overwrite) {
      await fs.remove(output_path)
    } else { // cannot overwrite the existing file
      throw new Error(`The output file ${output_path} already exists, use the --overwrite true argument`)
    }
  }
  // output the file
  await fs.outputFile(output_path, csv)
}
