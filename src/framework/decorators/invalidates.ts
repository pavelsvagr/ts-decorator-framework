import { cacheize, deletePattern } from '@ackee/kesha'
import redis from '../../connectors/redis'

/**
 * Invalidates cache after method is called
 */
export function invalidates(keys: Array<Parameters<typeof cacheize>[2]>) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalFn = descriptor.value

    descriptor.value = async function(...args) {
      const res = await originalFn.apply(this, args)
      for (const key of keys) {
        const keyToDelete = (typeof key === 'string') ? key : key(...args)
        await deletePattern(redis, keyToDelete, () => true, 500)
      }
      return res
    }

    return descriptor
  }
}
