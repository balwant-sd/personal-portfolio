import { useEffect, useRef } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

// same order as the sidebar
export const sections = [
  '/',
  '/about',
  '/experience',
  '/projects',
  '/skills',
]

export const sectionNames = {
  '/': 'Home',
  '/about': 'About',
  '/experience': 'Experience',
  '/projects': 'Projects',
  '/skills': 'Skills',
}

const COOLDOWN_MS = 1200 // one gesture moves one section
const SETTLE_MS = 700 // wait after an inner list stops scrolling
const WHEEL_THRESHOLD = 40

// nearest ancestor that can still scroll in the given direction
const findScrollable = (el, direction) => {
  while (el && el !== document.body) {
    const { overflowY } = getComputedStyle(el)
    if (
      (overflowY === 'auto' || overflowY === 'scroll') &&
      el.scrollHeight > el.clientHeight + 1
    ) {
      const atTop = el.scrollTop <= 0
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
      if ((direction > 0 && !atBottom) || (direction < 0 && !atTop)) return el
    }
    el = el.parentElement
  }
  return null
}

// targets that keep the wheel for themselves
const ignoreTarget = (el) =>
  el.closest && el.closest('textarea, input, select')

const useSectionScroll = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const lastNavAt = useRef(0)
  const lastInnerScrollAt = useRef(0)
  const wheelDelta = useRef(0)

  useEffect(() => {
    const index = sections.indexOf(pathname)
    if (index === -1) return undefined

    const go = (direction, target) => {
      const now = Date.now()
      if (ignoreTarget(target)) return
      // let scrollable lists (experience timeline, project grid) finish first
      if (findScrollable(target, direction)) {
        lastInnerScrollAt.current = now
        return
      }
      if (now - lastInnerScrollAt.current < SETTLE_MS) return
      if (now - lastNavAt.current < COOLDOWN_MS) return

      const next = sections[index + direction]
      if (!next) return
      lastNavAt.current = now
      navigate(next)
    }

    const onWheel = (e) => {
      if (Date.now() - lastNavAt.current < COOLDOWN_MS) {
        wheelDelta.current = 0
        return
      }
      wheelDelta.current += e.deltaY
      if (Math.abs(wheelDelta.current) < WHEEL_THRESHOLD) return
      const direction = wheelDelta.current > 0 ? 1 : -1
      wheelDelta.current = 0
      go(direction, e.target)
    }

    // touch swipes only scroll; on phones the Next button changes section
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
    }
  }, [pathname, navigate])
}

export default useSectionScroll
