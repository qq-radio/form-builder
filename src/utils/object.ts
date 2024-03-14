import { clone } from 'remeda'

export function updateObjectByKeyPath(obj: any, keyPath: string, value: any) {
  const newObj = clone(obj)
  const keys = keyPath.split('.')
  const lastKey = keys.pop()
  if (!lastKey) {
    return
  }
  const lastObj = keys.reduce((newObj, key) => (newObj[key] = newObj[key] || {}), newObj)
  lastObj[lastKey] = value
  return newObj
}

export function getObjectByKeyPath(obj: { [key: string]: any }, keyPath: string): any {
  const keys = keyPath.split('.')
  return keys.reduce((value, key) => {
    if (value instanceof Object && Object.prototype.hasOwnProperty.call(value, key)) {
      return value[key]
    } else {
      return undefined
    }
  }, obj)
}
