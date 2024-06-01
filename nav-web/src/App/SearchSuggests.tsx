import { startTransition, useEffect, useState } from 'react'
import { css } from '@emotion/css'
import { fetchSuggests, getRedirectHref } from '../util/search'

export default function SearchSuggests({ search }: { search: string }) {
  const [suggests, setSuggests] = useState<string[]>([])
  const [timestamp, setTimestamp] = useState(new Date().getTime())

  useEffect(() => {
    const now = new Date().getTime()
    setTimestamp(now)
    fetchSuggests(search).then(response => now >= timestamp && startTransition(() => setSuggests(response)))
  }, [search])

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
