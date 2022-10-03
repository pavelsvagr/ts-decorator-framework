/**
 * Logs method call with all of its arguments
 */
export const logged = (target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor) => {
  const fn = descriptor.value

  descriptor.value = function(...args) {
    console.log({
      args,
      method: propertyKey,
    })
    return fn.apply(this, args)
  }
  return descriptor
}
