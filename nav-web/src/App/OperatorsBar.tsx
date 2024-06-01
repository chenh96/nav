import { css } from '@emotion/css'
import { Children } from '../util/type'

import {
  MdBookmark,
  MdSensorDoor,
  MdCloudDownload,
  MdEdit,
  MdEditOff,
  MdCloudUpload,
  MdBookmarkAdd,
} from 'react-icons/md'

export default function OperatorsBar({
  fetchingBookmarks,
  loggedIn,
  editing,
  onLogin,
  onLogout,
  onRefresh,
  onEdit,
  onCancel,
  onSave,
  onAdd,
}: {
  fetchingBookmarks: boolean
  loggedIn: boolean
  editing: boolean
  onLogin: () => void
  onLogout: () => void
  onRefresh: () => void
  onEdit: () => void
  onCancel: () => void
  onSave: () => void
  onAdd: () => void
}) {
  return (
    <div className={Style.container}>
      {!loggedIn && (
        <Operator onClick={onLogin}>
          <MdBookmark color="#d06" />
        </Operator>
      )}
      {loggedIn && !editing && (
        <Operator onClick={onLogout} loading={fetchingBookmarks}>
          <MdSensorDoor color="#d60" />
        </Operator>
      )}
      {loggedIn && !editing && (
        <Operator onClick={onRefresh} loading={fetchingBookmarks}>
          <MdCloudDownload color="#480" />
        </Operator>
      )}
      {loggedIn && !editing && (
        <Operator onClick={onEdit} loading={fetchingBookmarks}>
          <MdEdit color="#a0d" />
        </Operator>
      )}
      {loggedIn && editing && (
        <Operator onClick={onCancel} loading={fetchingBookmarks}>
          <MdEditOff color="#d60" />
        </Operator>
      )}
      {loggedIn && editing && (
        <Operator onClick={onSave} loading={fetchingBookmarks}>
          <MdCloudUpload color="#480" />
        </Operator>
      )}
      {loggedIn && editing && (
        <Operator onClick={onAdd} loading={fetchingBookmarks}>
          <MdBookmarkAdd color="#08a" />
        </Operator>
      )}
    </div>
  )
}

function Operator({
  loading = false,
  onClick,
  children,
}: {
  loading?: boolean
  onClick: () => void
  children?: Children
}) {
  return (
    <button className={Style.operator(loading)} onClick={() => loading || onClick()}>
      {children}
    </button>
  )
}

const Style = {
  container: css({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
  }),
  operator: (loading: boolean) =>
    css({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      verticalAlign: 'top',
      padding: 0,
      width: '32px',
      height: '32px',
      marginLeft: '8px',
      border: 'none',
      borderRadius: '16px',
      outline: 'none',
      cursor: loading ? 'default' : 'pointer',
      filter: 'grayscale(1) opacity(0.25)',
      transition: 'background-color 0.1s ease, filter 0.2s ease',
      backgroundColor: loading ? 'rgba(235, 235, 235)' : 'rgba(255, 255, 255)',
      ':hover': {
        filter: 'none',
      },
      ':active': {
        backgroundColor: 'rgba(235, 235, 235)',
      },
      ':first-of-type': {
        marginLeft: 0,
      },
      '> img': {
        width: '20px',
        height: '20px',
      },
    }),
}
