import { css, cx } from '@emotion/css'
import { Bookmark } from '../util/bookmark'
import { copyOf } from '../util/bean'
import { Setter } from '../util/type'
import { ReactSortable } from 'react-sortablejs'
import { MdClose } from 'react-icons/md'

export default function UserBookmarks({
  editing,
  bookmarks,
  onSort,
}: {
  editing: boolean
  bookmarks: Bookmark[]
  onSort: Setter<Bookmark[]>
}) {
  return editing ? <SortBookmarks bookmarks={bookmarks} onChange={onSort} /> : <NormalBookmarks bookmarks={bookmarks} />
}

function NormalBookmarks({ bookmarks }: { bookmarks: Bookmark[] }) {
  return (
    <div className={Style.container}>
      {bookmarks.map(bookmark => (
        <NormalBookmark key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  )
}

function NormalBookmark({ bookmark }: { bookmark: Bookmark }) {
  return (
    <a href={bookmark.url} className={Style.col}>
      {!bookmark.icon || <img src={bookmark.icon} draggable={false} />}
      <span>{bookmark.name}</span>
    </a>
  )
}

function SortBookmarks({ bookmarks, onChange }: { bookmarks: Bookmark[]; onChange: Setter<Bookmark[]> }) {
  return (
    <ReactSortable className={Style.container} list={bookmarks} setList={onChange} animation={200}>
      {bookmarks.map((bookmark, i) => (
        <SortBookmark
          key={bookmark.id}
          bookmark={bookmark}
          onRemove={() => {
            onChange(prev => {
              const newBookmarks = copyOf(prev)
              newBookmarks.splice(i, 1)
              return newBookmarks
            })
          }}
        />
      ))}
    </ReactSortable>
  )
}

function SortBookmark({ bookmark, onRemove }: { bookmark: Bookmark; onRemove: () => void }) {
  return (
    <div className={cx(Style.col, Style.sortCol)}>
      <button className={Style.closer} onClick={onRemove}>
        <MdClose color="rgba(0, 0, 0, 0.4)" />
      </button>

      {!bookmark.icon || <img src={bookmark.icon} draggable={false} />}

      <span>{bookmark.name}</span>
    </div>
  )
}

const Style = {
  container: css({
    margin: '0 -8px 0 0',
    padding: '8px 0 0 0',
    maxHeight: 'calc(100% - 152px)',
    overflow: 'auto',
  }),
  col: css({
    display: 'inline-block',
    margin: '0 8px 8px 0',
    border: '1px solid rgba(40, 50, 60, 0.2)',
    borderRadius: '15px',
    backgroundColor: 'rgba(244, 245, 246)',
    lineHeight: '28px',
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.1s ease',
    ':hover': {
      backgroundColor: 'rgba(234, 235, 236)',
    },
    ':active': {
      backgroundColor: 'rgba(214, 215, 216)',
    },
    '> svg': {
      width: '16px',
      height: '16px',
      margin: '6px',
      verticalAlign: 'top',
    },
    '> img': {
      width: '20px',
      height: '20px',
      margin: '4px -4px 4px 8px',
      verticalAlign: 'top',
      borderRadius: '2px',
    },
    '> span': {
      verticalAlign: 'top',
      display: 'inline-block',
      margin: '0 8px',
      maxWidth: '256px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  }),
  sortCol: css({
    position: 'relative',
    cursor: 'grab',
    ':hover': {
      backgroundColor: 'rgba(244, 245, 246)',
    },
    ':active': {
      backgroundColor: 'rgba(244, 245, 246)',
    },
  }),
  closer: css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    position: 'absolute',
    right: '-8px',
    top: '-8px',
    width: '20px',
    height: '20px',
    color: 'rgba(0, 0, 0, 0.4)',
    backgroundColor: 'rgba(250, 120, 120)',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.1s ease',
    ':hover': {
      backgroundColor: 'rgba(240, 110, 110)',
    },
    ':active': {
      backgroundColor: 'rgba(220, 90, 90)',
    },
  }),
}
