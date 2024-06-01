import { useEffect, useState } from 'react'
import { Setter } from './type'
import { requestPost, clearCache } from './request'

export const TOKEN_REQUEST_KEY = 'Token'

const TOKEN_STORE_KEY = 'Token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_STORE_KEY)
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_STORE_KEY, token)
}

export function removeToken() {
  localStorage.removeItem(TOKEN_STORE_KEY)
  clearCache()
}

export function useToken(): [string, Setter<string>, () => void] {
  const [token, setTokenState] = useState<string>(getToken() || '')
  useEffect(() => setToken(token), [token])
  return [
    token,
    setTokenState,
    () => {
      removeToken()
      setTokenState('')
    },
  ]
}

export function fetchLogin(username: string, password: string): Promise<string> {
  removeToken()
  return new Promise<string>((resolve, reject) => {
    requestPost<string>('/api/user/login', { username, password })
      .then(result => resolve(result.data))
      .catch(reject)
  })
}
