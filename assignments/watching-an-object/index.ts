import { watch } from './watch'

const obj: { [key: string]: any } = {}

const watchedObj = watch(
  obj,
  (key) => {
    console.log(`property with key "${key}" accessed`)
  },
  (key, value) => {
    console.log(`property with key "${key}" modified to value "${value}"`)
  }
)

watchedObj.foo
watchedObj.foo = 'hi!'
watchedObj.foo

console.log(watchedObj.foo)
