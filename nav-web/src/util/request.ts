import axios, { Method } from 'axios'
import { setupCache, buildWebStorage } from 'axios-cache-interceptor'
import jsonp from 'jsonp'
import { removeToken, getToken, TOKEN_REQUEST_KEY } from './security'

const CACHE_KEY_PREFIX = 'axios-cache@'

const Requester = setupCache(axios, {
  storage: buildWebStorage(localStorage, CACHE_KEY_PREFIX),
  ttl: 7 * 24 * 60 * 60 * 1000,
})

function toKey(url: string, method: Method, params?: { [key: string]: string }, data?: object) {
  return `${method}-${url}-${JSON.stringify(params)}-${JSON.stringify(data)}`
}

export type Result<E> = {
  code: 200 | 500 | 400
  message: string
  data: E
}

export function request<E>({
  url,
  method,
  params = {},
  data = {},
  alertFailed = true,
}: {
  url: string
  method: Method
  params?: { [key: string]: string }
  data?: object
  alertFailed?: boolean
}): Promise<Result<E>> {
  return new Promise<Result<E>>((resolve, reject) => {
    Requester.request<Result<E>>({
      id: toKey(url, method, params, data),
      url,
      method,
      params,
      data,
      headers: { [TOKEN_REQUEST_KEY]: getToken() },
      timeout: 60000,
    })
      .then(response => {
        const data = response.data
        if (data.code === 400) {
          if (getToken()) {
            removeToken()
            location.reload()
          }
          reject(data)
          return
        }

        if (data.code === 500) {
          if (alertFailed) {
            alert(data.message)
          }
          reject(data)
          return
        }

        resolve(data)
      })
      .catch(error => {
        if (alertFailed) {
          alert('服务器请求异常')
        }
        reject(error)
      })
  })
}

export function clearCache() {
  Object.keys(localStorage)
    .filter(key => key.startsWith(CACHE_KEY_PREFIX))
    .forEach(key => localStorage.removeItem(key))
}

export function requestGet<E>(
  url: string,
  params?: { [key: string]: string },
  alertFailed: boolean = true
): Promise<Result<E>> {
  return request({
    url,
    params,
    method: 'GET',
    alertFailed,
  })
}

export function requestPost<E>(url: string, data?: object, alertFailed: boolean = true): Promise<Result<E>> {
  return request({
    url,
    data,
    method: 'POST',
    alertFailed,
  })
}

export function jsonpGet<R>(url: string): Promise<R> {
  return new Promise<R>((resolve, reject) => {
    jsonp(url, (err, data) => {
      if (err) {
        console.error(err)
        reject(err)
      } else {
        resolve(data as R)
      }
    })
  })
}
