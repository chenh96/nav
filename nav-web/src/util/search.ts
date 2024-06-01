import { jsonpGet } from './request'

export function fetchSuggests(search: string): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    jsonpGet<[any, [string][]?]>(`https://suggestqueries.google.com/complete/search?client=youtube&q=${search}`)
      .then(response => resolve(response[1]?.map(l => l[0]) || []))
      .catch(reject)
  })
}

export function getRedirectHref(search: string): string {
  return `https://www.google.com/search?q=${search}`
}
