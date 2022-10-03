import { z } from 'zod'

/**
 * Invalidates method parameter based on zod schema and parameter position
 */
export function validates(schema: z.ZodSchema, paramIndex: number) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalFn = descriptor.value

    descriptor.value = function(...args) {
      schema.parse(args[paramIndex])
      return originalFn.apply(this, args)
    }

    return descriptor
  }
}
