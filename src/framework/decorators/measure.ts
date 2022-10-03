/**
 * Measures runtime of some class method
 */
export function measure(target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor) {
  const originalFn = descriptor.value

  descriptor.value = function(...args) {
    const start = performance.now()
    const result = originalFn.apply(this, args)
    const finish = performance.now()
    console.log(`Execution time: ${finish - start} ms`)
    return result
  }
  return descriptor
}
