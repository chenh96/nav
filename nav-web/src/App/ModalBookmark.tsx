import { useEffect, useState } from 'react'
import { css } from '@emotion/css'
import { nanoid } from 'nanoid'
import { Bookmark } from '../util/bookmark'
import { isBlank } from '../util/string'
import { MdTag, MdLink, MdImage } from 'react-icons/md'
import Modal from '../comp/Modal'
import Input from '../comp/Input'
import Button from '../comp/Button'

export default function ModalBookmark({
  show,
  onAdd,
  onClose,
}: {
  show: boolean
  onAdd: (bookmark: Bookmark) => void
  onClose: () => void
}) {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [icon, setIcon] = useState('')

  useEffect(() => {
    if (show) {
      setName('')
      setUrl('')
      setIcon('')
    }
  }, [show])

  return (
    <Modal show={show} className={Style.container}>
      <Input value={name} onInput={setName} icon={<MdTag color="#00d" />} className={Style.input} />
      <Input value={url} onInput={setUrl} icon={<MdLink color="#480" />} className={Style.input} />
      <Input value={icon} onInput={setIcon} icon={<MdImage color="#d60" />} className={Style.input} />

      <div className={Style.buttons}>
        <Button onClick={onClose}>取消</Button>
        <Button
          type="Blue"
          onClick={() => onAdd({ id: nanoid(), name, url, icon })}
          disabled={isBlank(name) || isBlank(url)}
        >
          确定
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
