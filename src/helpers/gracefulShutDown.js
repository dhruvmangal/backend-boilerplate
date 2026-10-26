import { sequelize } from '~/db/models'
import redisClient from '~/libs/redisClient'

export default async function gracefulShutDown (signal) {
  try {
    await sequelize.close()
    redisClient.client.disconnect()
    redisClient.publisherClient.disconnect()
    redisClient.subscriberClient.disconnect()
    console.log(`Received ${signal}`)
  } catch (err) {
    console.log('GraceFul ShutDown Failed', err)
  }
  process.exit(0)
}
