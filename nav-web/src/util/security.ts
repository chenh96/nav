import { useState } from 'react'
import { requestPost } from './request'

export const TOKEN_REQUEST_KEY = 'Token'

const TOKEN_STORE_KEY = 'Token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_STORE_KEY)
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_STORE_KEY, token)
}

export function clearUserData() {
  localStorage.clear()
}

export function useToken(): [string | null, (token: string) => void] {
  const [token, setTokenState] = useState<string | null>(getToken())
  return [
    token,
    token => {
      setToken(token)
      setTokenState(token)
    },
  ]
}

export function fetchLogin(username: string, password: string): Promise<string> {
  clearUserData()
  return new Promise<string>((resolve, reject) => {
    requestPost<string>('/api/user/login', { username, password })
      .then(result => resolve(result.data))
      .catch(reject)
  })
}
