import { useState, HTMLInputTypeAttribute } from 'react'
import { css, cx } from '@emotion/css'
import { Children } from '../util/type'

export default function Input({
  type = 'text',
  value,
  onInput,
  onEnter = () => {},
  icon,
  autoFocus = false,
  className,
}: {
  type?: HTMLInputTypeAttribute
  value: string
  onInput: (value: string) => void
  onEnter?: () => void
  icon: Children
  autoFocus?: boolean
  className?: string
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div className={cx(Style.container, className)}>
      <div className={Style.icon(focused)}>{icon}</div>

      <input
        autoFocus={autoFocus}
        type={type}
        className={Style.input}
        value={value}
        onInput={e => onInput(e.currentTarget.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyUp={e => e.key === 'Enter' && onEnter()}
      />
    </div>
  )
}

const Style = {
  container: css({
    position: 'relative',
    height: '32px',
  }),
  icon: (focused: boolean) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      margin: 'auto',
      width: '32px',
      height: '32px',
      color: 'rgba(0, 100, 200)',
      filter: focused ? 'none' : 'grayscale(1) opacity(0.25)',
      transition: 'filter 0.2s ease',
    }),
  input: css({
    width: '100%',
    height: '100%',
    margin: 0,
    padding: '0 8px 0 32px',
    border: '1px solid rgba(40, 50, 60, 0.2)',
    borderRadius: '4px',
    backgroundColor: 'rgba(244, 245, 246)',
    outline: 'none',
    transition: 'border 0.2s ease',
    ':hover': {
      border: '1px solid rgba(40, 50, 60, 0.4)',
    },
    ':focus': {
      border: '1px solid rgba(0, 100, 200)',
    },
  }),
}
