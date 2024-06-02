import { useMemo, useState } from 'react'
import { requestGet, requestPost } from './request'
import { isNotBlank } from './string'
import { getToken } from './security'
import { Setter } from './type'

const BOOKMARK_STORE_KEY = 'Bookmarks'

export type Bookmark = {
  id: number | string
  name: string
  url: string
  icon: string
  sort?: number
}

function getCachedBookmarks(): Bookmark[] | null {
  const cache = localStorage.getItem(BOOKMARK_STORE_KEY)
  if (!cache) {
    return null
  }
  return JSON.parse(cache)
}

function cacheBookmarks(bookmarks: Bookmark[]) {
  localStorage.setItem(BOOKMARK_STORE_KEY, JSON.stringify(bookmarks))
}

function fetchBookmarks(): Promise<Bookmark[]> {
  return new Promise<Bookmark[]>((resolve, reject) =>
    requestGet<Bookmark[]>('/api/bookmark')
      .then(result => resolve(result.data))
      .catch(reject)
  )
}

function saveBookmarks(bookmarks: Bookmark[]) {
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
  const cachedBookmarks = getCachedBookmarks()

  const [bookmarks, setBookmarks] = useState<Bookmark[]>(cachedBookmarks || [])
  const [fetchingGet, setFetchingGet] = useState(false)
  const [fetchingSave, setFetchingSave] = useState(false)

  const fetch = () =>
    new Promise<void>(resolve => {
      setFetchingGet(true)
      fetchBookmarks()
        .then(result => {
          cacheBookmarks(result)
          setBookmarks(result)
          resolve()
        })
        .finally(() => setFetchingGet(false))
    })

  const save = () =>
    new Promise<void>(resolve => {
      if (isNotBlank(getToken())) {
        setFetchingSave(true)
        saveBookmarks(bookmarks.map((bookmark, sort) => ({ ...bookmark, sort })))
          .then(result => {
            cacheBookmarks(result)
            setBookmarks(result)
            resolve()
          })
          .finally(() => setFetchingSave(false))
      }
    })

  return [bookmarks, setBookmarks, fetch, save, useMemo(() => fetchingGet || fetchingSave, [fetchingGet, fetchingSave])]
}
