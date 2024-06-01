import { getToken, TOKEN_REQUEST_KEY } from './security'

export function getFaviconSrc(url: string) {
  return `/api/favicon?url=${url}&${TOKEN_REQUEST_KEY}=${getToken()}`
}
