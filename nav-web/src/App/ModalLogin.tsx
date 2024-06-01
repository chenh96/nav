import { useState } from 'react'
import { css } from '@emotion/css'
import { fetchLogin } from '../util/security'
import { isBlank } from '../util/string'
import { MdPerson, MdPassword } from 'react-icons/md'
import Modal from '../comp/Modal'
import Input from '../comp/Input'
import Button from '../comp/Button'

export default function ModallLogin({
  show,
  onSuccess,
  onClose,
}: {
  show: boolean
  onSuccess: (token: string) => void
  onClose: () => void
}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const login = () => {
    setLoading(true)
    fetchLogin(username, password)
      .then(token => {
        onSuccess(token)
        setUsername('')
        setPassword('')
      })
      .finally(() => setLoading(false))
  }

  return (
    <Modal show={show} className={Style.container}>
      <Input
        autoFocus
        value={username}
        onInput={setUsername}
        onEnter={login}
        icon={<MdPerson color="#a0d" />}
        className={Style.input}
      />
      <Input
        type="password"
        value={password}
        onInput={setPassword}
        onEnter={login}
        icon={<MdPassword color="#00d" />}
        className={Style.input}
      />

      <div className={Style.buttons}>
        <Button onClick={onClose}>取消</Button>
        <Button type="Blue" onClick={login} disabled={loading || isBlank(username) || isBlank(password)}>
          登录 | 注册
        </Button>
      </div>
    </Modal>
  )
}

const Style = {
  container: css({
    padding: '0 8px',
  }),
  input: css({
    marginTop: '8px',
    ':last-of-type': {
      marginBottom: '8px',
    },
  }),
  buttons: css({
    textAlign: 'right',
    padding: '8px 0',
    '> *': {
      marginLeft: '8px',
    },
  }),
}
