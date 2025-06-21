import { css, cx } from '@emotion/css'
import { ReactNode } from 'react'

export default function Button({
  type = 'Normal',
  onClick,
  children,
  className,
  disabled = false,
}: {
  type?: 'Normal' | 'Blue'
  onClick: () => void
  children: ReactNode
  className?: string
  disabled?: boolean
}) {
  const color = { Normal: () => null, Blue: Style.blue }[type]

  return (
    <button className={cx(Style.button(disabled), color(disabled), className)} onClick={() => disabled || onClick()}>
      {children}
    </button>
  )
}

const Style = {
  button: (disabled: boolean) =>
    css({
      height: '32px',
      padding: '0 8px',
      border: '1px solid rgba(40, 50, 60, 0.2)',
      borderRadius: '4px',
      outline: 'none',
      cursor: disabled ? 'default' : 'pointer',
      backgroundColor: 'rgba(244, 245, 246)',
      transition: 'background-color 0.1s ease',
      opacity: disabled ? 0.5 : 1,
      ':hover': {
        backgroundColor: disabled ? 'rgba(244, 245, 246)' : 'rgba(234, 235, 236)',
      },
      ':active': {
        backgroundColor: disabled ? 'rgba(244, 245, 246)' : 'rgba(214, 215, 216)',
      },
    }),
  blue: (disabled: boolean) =>
    css({
      border: '1px solid rgba(0, 60, 160)',
      color: 'rgba(255, 255, 255)',
      backgroundColor: 'rgba(0, 100, 200)',
      ':hover': {
        backgroundColor: disabled ? 'rgba(0, 100, 200)' : 'rgba(0, 90, 190)',
      },
      ':active': {
        backgroundColor: disabled ? 'rgba(0, 100, 200)' : 'rgba(0, 70, 170)',
      },
    }),
}
