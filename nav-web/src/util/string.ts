export function isBlank(str: string | undefined | null) {
  return str === undefined || str === null || str.trim().length <= 0
}

export function isNotBlank(str: string | undefined | null) {
  return !isBlank(str)
}

export function isNumber(str: string | undefined | null) {
  return isNotBlank(str) && !!str!!.match('[0-9]+')
}
