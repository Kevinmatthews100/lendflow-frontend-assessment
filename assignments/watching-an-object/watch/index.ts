/**
 * @description Returns a Proxy object of the given object, that:
 *  - Calls `getCallback` any time an **existing** property on the returned object is accessed,
 *    if `getCallback` is not `undefined`.
 *  - Calls `setCallback` any time a property is set or updated on the returned object,
 *    if `setCallback` is not `undefined`.
 */
export const watch = <T extends Object>(
  obj: T,
  getCallback: ((key: Symbol | string, value: any) => void) | undefined,
  setCallback: ((key: Symbol | string, value: any) => void) | undefined
): T => {
  const objProxy = new Proxy(obj, {
    get(target, prop) {
      if (target[prop] === undefined) {
        return undefined
      }

      if (!!getCallback) {
        getCallback(prop, target[prop])
      }

      return target[prop]
    },

    set(target, prop, value) {
      target[prop] = value

      if (!!setCallback) {
        setCallback(prop, target[prop])
      }

      return true
    }
  })

  return objProxy
}
