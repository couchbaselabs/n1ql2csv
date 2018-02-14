import json2csv from 'json2csv'
import path from 'path'
import fs from 'fs-extra'
import request from 'request-promise-native'

export default async function n1ql2csv ({
  cluster,
  secure,
  port,
  username,
  password,
  statement,
  output,
  overwrite,
  timeout,
  delimiter,
  headers,
}) {
  const url = `${secure ? 'https' : 'http'}://${username}:${password}@${cluster}:${port}/query/service`
  const body = {
    statement,
  }
  // call the REST query endpoint
  const { results } = await request(url, {
    body,
    json: true,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout,
  })

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
