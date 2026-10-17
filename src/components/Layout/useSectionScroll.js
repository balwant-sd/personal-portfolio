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

const COOLDOWN_MS = 1200 // one gesture moves one section
const SETTLE_MS = 700 // wait after an inner list stops scrolling
const WHEEL_THRESHOLD = 40
const SWIPE_THRESHOLD = 60

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

    let touchStartY = null
    let touchTarget = null
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
      touchTarget = e.target
    }
    const onTouchEnd = (e) => {
      if (touchStartY === null) return
      const deltaY = touchStartY - e.changedTouches[0].clientY
      touchStartY = null
      if (Math.abs(deltaY) < SWIPE_THRESHOLD) return
      go(deltaY > 0 ? 1 : -1, touchTarget)
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [pathname, navigate])
}

export default useSectionScroll
