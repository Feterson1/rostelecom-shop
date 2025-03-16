import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'

export async function GET() {
  const { db } = await getDbAndReqBody(clientPromise, null)
}
