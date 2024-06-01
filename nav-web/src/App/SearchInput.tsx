import { useState } from 'react'
import { css } from '@emotion/css'

import { MdSearch } from 'react-icons/md'

export default function SearchInput({
  value,
  onInput,
  onSearch,
}: {
  value: string
  onInput: (value: string) => void
  onSearch: () => void
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div className={Style.container}>
      <input
        autoFocus
        type="text"
        className={Style.input}
        value={value}
        onInput={e => onInput(e.currentTarget.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyUp={e => e.key === 'Enter' && onSearch()}
      />
      <button className={Style.button(focused)} onClick={onSearch}>
        <MdSearch size={24} />
      </button>
    </div>
  )
}

const Style = {
  container: css({
    position: 'relative',
    height: '40px',
    marginTop: '8px',
  }),
  input: css({
    width: '100%',
    height: '100%',
    padding: '0 40px 0 8px',
    backgroundColor: 'rgba(244, 245, 246)',
    border: '2px solid rgba(40, 50, 60, 0.2)',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border 0.2s ease',
    ':hover': {
      border: '2px solid rgba(40, 50, 60, 0.4)',
    },
    ':focus': {
      border: '2px solid rgba(0, 100, 200)',
    },
  }),
  button: (focused: boolean) =>
    css({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      position: 'absolute',
      right: '4px',
      top: 0,
      bottom: 0,
      margin: 'auto',
      width: '32px',
      height: '32px',
      border: 'none',
      borderRadius: '2px',
      outline: 'none',
      backgroundColor: 'rgba(244, 245, 246)',
      cursor: 'pointer',
      filter: focused ? 'none' : 'grayscale(1) opacity(0.25)',
      color: 'rgb(0, 100, 200)',
      transition: 'background-color 0.1s ease, filter 0.2s ease',
      ':hover': {
        filter: 'none',
      },
      ':active': {
        backgroundColor: 'rgba(214, 215, 216)',
      },
    }),
}
