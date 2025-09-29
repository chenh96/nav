import { useEffect, useState } from 'react'
import { css, cx, keyframes } from '@emotion/css'

export default function Modal({ show, children, className }: { show: boolean; children: any; className?: string }) {
  const [exists, setExists] = useState(show)

  useEffect(() => {
    show ? setExists(true) : setTimeout(() => setExists(false), 200)
  }, [show])

  return exists ? (
    <>
      <div className={Style.cover(show)}></div>
      <div className={cx(Style.content(show), className)}>{children}</div>
    </>
  ) : (
    <></>
  )
}

const Animation = {
  fadeIn: keyframes({
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  }),
  fadeOut: keyframes({
    '0%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    },
  }),
  scaleIn: keyframes({
    '0%': {
      opacity: 0,
      transform: 'scale(0.5)',
    },
    '100%': {
      opacity: 1,
      transform: 'none',
    },
  }),
  scaleOut: keyframes({
    '0%': {
      opacity: 1,
      transform: 'none',
    },
    '100%': {
      opacity: 0,
      transform: 'scale(0.5)',
    },
  }),
}

const Style = {
  cover: (visible: boolean) =>
    css({
      position: 'fixed',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      zIndex: 100,
      opacity: visible ? 1 : 0,
      animation: `${visible ? Animation.fadeIn : Animation.fadeOut} 0.2s ease`,
    }),
  content: (visible: boolean) =>
    css({
      position: 'fixed',
      left: 0,
      right: 0,
      top: '25%',
      margin: 'auto',
      width: '400px',
      maxWidth: 'calc(100% - 16px)',
      backgroundColor: 'rgba(255, 255, 255)',
      border: '1px solid rgba(40, 50, 60, 0.4)',
      borderRadius: '8px',
      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
      zIndex: 101,
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'scale(0.5)',
      animation: `${visible ? Animation.scaleIn : Animation.scaleOut} 0.2s ease`,
    }),
}
