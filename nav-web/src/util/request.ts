import axios, { Method, AxiosError } from 'axios'
import jsonp from 'jsonp'
import { getToken, clearUserData, TOKEN_REQUEST_KEY } from './security'

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
    axios.request<Result<E>>({
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
            location.reload()
          }
          clearUserData()
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
      .catch((error: AxiosError) => {
        if (alertFailed) {
          alert('服务器请求异常')
        }
        reject(error)
      })
  })
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
        reject(err)
      } else {
        resolve(data as R)
      }
    })
  })
}
