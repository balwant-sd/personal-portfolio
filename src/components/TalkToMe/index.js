import { useEffect, useRef, useState } from 'react'

import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import {
  faComments,
  faEnvelope,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './index.scss'

const EMAIL = 'balwantsingh.sd@outlook.com'
const WHATSAPP = '917976609630'
const GREETING = "Hi Balwant, I came across your portfolio and I'd like to talk."

const options = [
  {
    label: 'WhatsApp',
    icon: faWhatsapp,
    className: 'whatsapp',
    href: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(GREETING)}`,
    external: true,
  },
  {
    label: 'Email',
    icon: faEnvelope,
    className: 'email',
    href: `mailto:${EMAIL}?subject=${encodeURIComponent(
      "Let's talk"
    )}&body=${encodeURIComponent(GREETING)}`,
  },
]

// other components can open it with window.dispatchEvent(new Event('open-talk'))
export const openTalk = () => window.dispatchEvent(new Event('open-talk'))

const TalkToMe = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onOpen = () => setOpen(true)
    const onClickAway = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('open-talk', onOpen)
    document.addEventListener('mousedown', onClickAway)
    document.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('open-talk', onOpen)
      document.removeEventListener('mousedown', onClickAway)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div className={`talk-to-me${open ? ' open' : ''}`} ref={ref}>
      <ul className="talk-options" aria-hidden={!open}>
        {options.map((option) => (
          <li key={option.label}>
            <span className="talk-label">{option.label}</span>
            <a
              href={option.href}
              className={`talk-option ${option.className}`}
              aria-label={`Talk to me on ${option.label}`}
              tabIndex={open ? 0 : -1}
              {...(option.external && { target: '_blank', rel: 'noreferrer' })}
            >
              <FontAwesomeIcon icon={option.icon} />
            </a>
          </li>
        ))}
      </ul>
      <button
        className="talk-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <FontAwesomeIcon icon={open ? faXmark : faComments} />
        <span>{open ? 'Close' : "Let's talk"}</span>
      </button>
    </div>
  )
}

export default TalkToMe
