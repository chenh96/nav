import { startTransition, useEffect, useState, useRef } from 'react'
import { css } from '@emotion/css'
import { fetchSuggests, getRedirectHref } from '../util/search'
import { useDebounce } from '../util/debounce'

export default function SearchSuggests({ search }: { search: string }) {
  const [suggests, setSuggests] = useState<string[]>([])
  const abortControllerRef = useRef<AbortController | null>(null)

  const debouncedSearch = useDebounce(search, 200)

  useEffect(() => {
    // 如果搜索词为空，清空建议
    if (!debouncedSearch.trim()) {
      setSuggests([])
      return
    }

    // 取消之前的请求
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // 创建新的 AbortController
    abortControllerRef.current = new AbortController()

    fetchSuggests(debouncedSearch, abortControllerRef.current.signal)
      .then(response => {
        // 检查请求是否被取消
        if (!abortControllerRef.current?.signal.aborted) {
          startTransition(() => {
            setSuggests(response)
          })
        }
      })
      .catch(error => {
        // 忽略被取消的请求错误，静默处理其他错误
        if (error.name !== 'AbortError' && error.message !== 'Request aborted') {
          console.error('搜索建议请求失败:', error)
        }
      })
  }, [debouncedSearch])

  // 组件卸载时取消请求
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return (
    <div className={Style.container(suggests.length * 34 + 6)}>
      {suggests.length <= 0 && (
        <a className={Style.item} href={getRedirectHref(search)}>
          {search}
        </a>
      )}
      {suggests.length > 0 &&
        suggests.map(suggest => (
          <a className={Style.item} key={suggest} href={getRedirectHref(suggest)}>
            {suggest}
          </a>
        ))}
    </div>
  )
}

const Style = {
  container: (height: number) =>
    css({
      backgroundColor: 'rgba(244, 245, 246)',
      border: '2px solid rgba(40, 50, 60, 0.2)',
      borderRadius: '4px',
      marginTop: '8px',
      padding: '2px',
      height: `${height}px`,
      minHeight: '40px',
      maxHeight: 'calc(100% - 158px)',
      overflow: 'auto',
      transition: 'height 0.2s ease',
      '::-webkit-scrollbar': {
        display: 'none',
      },
    }),
  item: css({
    display: 'block',
    lineHeight: '32px',
    marginTop: '2px',
    padding: '0 8px',
    borderRadius: '2px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.1s ease',
    ':first-of-type': {
      marginTop: '0px',
    },
    ':hover': {
      backgroundColor: 'rgba(234, 235, 236)',
    },
    ':active': {
      backgroundColor: 'rgba(214, 215, 216)',
    },
  }),
}
