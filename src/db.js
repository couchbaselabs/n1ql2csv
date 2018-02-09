import { promisifyAll } from 'bluebird'
import couchbase from 'couchbase'

// add promise support to Cluster
const Cluster = promisifyAll(couchbase.Cluster)

// hold references to cluster and bucket
let cluster_ref
let bucket_ref

// lazy load the database connection
export async function connect ({
  cluster,
  bucket,
  timeout,
  username,
  password,
}) {
  // if the bucket hasn't been loaded already, load it
  if (!bucket_ref) {
    // connect and authenticate to the cluster
    cluster_ref = new Cluster(`couchbase://${cluster}?n1ql_timeout=${timeout}`)
    cluster_ref.authenticate(
      username,
      password,
    )
    // connect to the bucket and add promise support
    bucket_ref = await cluster_ref.openBucket(bucket)
    bucket_ref = promisifyAll(bucket_ref)
  }
  return bucket_ref
}

// lazy load the database connection
export async function disconnect () {
  // if the bucket hasn't been loaded already, load it
  if (bucket_ref) {
    await bucket_ref.disconnect()
  }
}
