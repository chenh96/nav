import { css } from '@emotion/css'
import googleIcon from '../img/google.png'

export default function SearchLogo() {
  return (
    <div className={Style.container}>
      <img className={Style.logo} src={googleIcon} alt="Google" draggable={false} />
    </div>
  )
}

const Style = {
  container: css({
    textAlign: 'center',
    height: '64px',
  }),
  logo: css({
    maxWidth: '100%',
    maxHeight: '100%',
  }),
}
