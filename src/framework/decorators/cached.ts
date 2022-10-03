import { cacheize, ClearMethods } from '@ackee/kesha'
import redis from '../../connectors/redis'

/**
 * Caches method call
 */
export function cached(timeInMin: number, key: Parameters<typeof cacheize>[2]) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value

    descriptor.value = function(...args) {
      return cacheize(
        redis,
        (...args2) => originalMethod.apply(this, args2),
        key,
        {
          ttl: timeInMin * 60e3,
          clearMethod: ClearMethods.Unlink,
        })(...args)
    }
    return descriptor
  }
}
