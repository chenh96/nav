import { jsonpGet } from './request'

export function fetchSuggests(search: string, signal?: AbortSignal): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    // 检查是否已取消
    if (signal?.aborted) {
      reject(new Error('Request aborted'))
      return
    }

    const promise = jsonpGet<[any, [string][]?]>(`https://suggestqueries.google.com/complete/search?client=youtube&q=${search}`)
    
    promise
      .then(response => {
        // 再次检查是否已取消
        if (signal?.aborted) {
          reject(new Error('Request aborted'))
          return
        }
        resolve(response[1]?.map(l => l[0]) || [])
      })
      .catch(error => {
        if (signal?.aborted) {
          reject(new Error('Request aborted'))
        } else {
          reject(error)
        }
      })

    // 监听取消信号
    if (signal) {
      signal.addEventListener('abort', () => {
        reject(new Error('Request aborted'))
      })
    }
  })
}

export function getRedirectHref(search: string): string {
  return `https://www.google.com/search?q=${search}`
}
