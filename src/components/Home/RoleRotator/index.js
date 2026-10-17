import { useEffect, useState } from 'react'

import './index.scss'

export const roles = [
  'Senior Software Engineer',
  'Forward Deployed Engineer',
  'Team Lead',
  'Project Manager',
]

const TYPE_MS = 70
const DELETE_MS = 35
const HOLD_MS = 1800
const START_DELAY_MS = 2200 // let the name animate in first

// types each role, holds it, deletes it, then moves to the next
const RoleRotator = () => {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), START_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!started) return undefined
    const role = roles[roleIndex]
    let delay = deleting ? DELETE_MS : TYPE_MS
    if (!deleting && text === role) delay = HOLD_MS

    const timer = setTimeout(() => {
      if (!deleting && text === role) {
        setDeleting(true)
      } else if (deleting && text === '') {
        setDeleting(false)
        setRoleIndex((index) => (index + 1) % roles.length)
      } else {
        setText(role.slice(0, text.length + (deleting ? -1 : 1)))
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [started, text, deleting, roleIndex])

  return (
    <span className="role-rotator" aria-label={roles.join(', ')}>
      <span aria-hidden="true">{text}</span>
      <span className="role-caret" aria-hidden="true">
        |
      </span>
    </span>
  )
}

export default RoleRotator
