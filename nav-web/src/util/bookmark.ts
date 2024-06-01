import { useMemo, useState } from 'react'
import { requestGet, requestPost, clearCache } from './request'
import { isNotBlank } from './string'
import { getToken } from './security'
import { Setter } from './type'

export type Bookmark = {
  id: number | string
  name: string
  url: string
  icon: string
  sort?: number
}

export function fetchBookmarks(): Promise<Bookmark[]> {
  return new Promise<Bookmark[]>((resolve, reject) =>
    requestGet<Bookmark[]>('/api/bookmark')
      .then(result => resolve(result.data))
      .catch(reject)
  )
}

export function saveBookmarks(bookmarks: Bookmark[]) {
  clearCache()
  return new Promise<Bookmark[]>((resolve, reject) =>
    requestPost<Bookmark[]>(
      '/api/bookmark',
      bookmarks.map((bookmark, index) => ({
        ...bookmark,
        id: undefined,
        sort: index,
      }))
    )
      .then(result => resolve(result.data))
      .catch(reject)
  )
}

export function useBookmarks(): [Bookmark[], Setter<Bookmark[]>, () => Promise<void>, () => Promise<void>, boolean] {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [fetchingGet, setFetchingGet] = useState(false)
  const [fetchingSave, setFetchingSave] = useState(false)

  const fetch = () => {
    return new Promise<void>(resolve => {
      setFetchingGet(true)
      fetchBookmarks()
        .then(result => {
          setBookmarks(result)
          resolve()
        })
        .finally(() => setFetchingGet(false))
    })
  }

  const save = () => {
    return new Promise<void>(resolve => {
      if (isNotBlank(getToken())) {
        setFetchingSave(true)
        saveBookmarks(bookmarks.map((bookmark, sort) => ({ ...bookmark, sort })))
          .then(result => {
            setBookmarks(result)
            resolve()
          })
          .finally(() => setFetchingSave(false))
      }
    })
  }

  return [bookmarks, setBookmarks, fetch, save, useMemo(() => fetchingGet || fetchingSave, [fetchingGet, fetchingSave])]
}