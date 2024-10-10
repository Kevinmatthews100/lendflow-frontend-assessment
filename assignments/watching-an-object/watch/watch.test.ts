import { describe, expect, test } from 'vitest'
import { watch } from '.'

describe('watch', () => {
  test('consuming code can correctly read and write to proxy objects', () => {
    const obj: { [key: string]: any } = {}

    const watchedObj = watch(obj, undefined, undefined)

    const watchedObjWithCallbacks = watch(
      obj,
      () => {
        void 0
      },
      () => {
        void 0
      }
    )

    watchedObj.foo = true
    watchedObjWithCallbacks.foo = true

    expect(watchedObj.foo).toBeTruthy()
    expect(watchedObjWithCallbacks.foo).toBeTruthy()
  })

  test('callback is executed with correct parameters when existing property of watched object is accessed', () => {
    const obj: { [key: string]: any } = {}

    let getTrapParams = {}
    let setTrapParams = {}

    const watchedObj = watch(
      obj,
      (key, value) => {
        getTrapParams = { key, value }
      },
      (key, value) => {
        setTrapParams = { key, value }
      }
    )

    watchedObj.foo = true
    watchedObj.foo

    expect(getTrapParams).toEqual({ key: 'foo', value: true })
  })

  test('callback is executed with correct parameters when when property is set or updated on watched object', () => {
    const obj: { [key: string]: any } = {}

    let getTrapParams = {}
    let setTrapParams = {}

    const watchedObj = watch(
      obj,
      (key, value) => {
        getTrapParams = { key, value }
      },
      (key, value) => {
        setTrapParams = { key, value }
      }
    )

    watchedObj.foo = true

    expect(setTrapParams).toEqual({ key: 'foo', value: true })
  })

  test('callback is not executed when accessed property is undefined', () => {
    const obj: { [key: string]: any } = {}

    let getTrapCalled = false

    const watchedObj = watch(
      obj,
      () => {
        getTrapCalled = true
      },
      undefined
    )

    watchedObj.foo

    expect(getTrapCalled).toBeFalsy()
  })

  test('callback is executed when accessed property is falsey', () => {
    const obj: { [key: string]: any } = {}

    let getTrapCalled = false

    const watchedObj = watch(
      obj,
      (key, value) => {
        getTrapCalled = true
      },
      undefined
    )

    watchedObj.foo = false
    watchedObj.foo

    expect(getTrapCalled).toBeTruthy()
  })
})
